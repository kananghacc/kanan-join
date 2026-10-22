#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const {chromium, expect} = require('playwright/test');

async function main() {
  const [base, out, feature] = process.argv.slice(2);
  const actions = [], requests = [], errors = [], consoleMessages = [];
  const launch = {headless: true};
  if (process.env.VERIFY_BROWSER) launch.executablePath = process.env.VERIFY_BROWSER;
  else if (!fs.existsSync(chromium.executablePath())) {
    const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
    const candidates = fs.existsSync(cache) ? fs.readdirSync(cache).filter(x => x.startsWith('chromium_headless_shell-')).sort((a,b) => b.localeCompare(a, undefined, {numeric:true})) : [];
    const found = candidates.map(x => path.join(cache, x, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(x => fs.existsSync(x));
    if (!found) throw new Error('Chromium missing; set VERIFY_BROWSER to a compatible browser executable');
    launch.executablePath = found;
  }
  const browser = await chromium.launch(launch);
  let context, page;
  try {
    context = await browser.newContext({viewport: {width: 1440, height: 1000}});
    await context.tracing.start({screenshots: true, snapshots: true, sources: true});
    await context.route('**/*', async route => {
      const req = route.request(), host = new URL(req.url()).hostname;
      const block = !['GET', 'HEAD'].includes(req.method()) || /(^|\.)(googletagmanager\.com|google-analytics\.com|facebook\.com|pikapod\.net)$/.test(host);
      requests.push({url:req.url(), method:req.method(), blocked:block});
      if (block) await route.abort(); else await route.continue();
    });
    page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', msg => consoleMessages.push({type:msg.type(), text:msg.text()}));
    async function capture(name) {
      await page.screenshot({path: path.join(out, name+'.png'), fullPage:false, animations:'disabled', timeout:15000});
      fs.writeFileSync(path.join(out, name+'.aria.txt'), await page.locator('body').ariaSnapshot());
    }
    async function settleScroll() {
      let previous, stable = 0;
      await expect.poll(async () => {
        const position = await page.evaluate(() => window.scrollY);
        stable = previous !== undefined && Math.abs(position-previous)<1 ? stable+1 : 0;
        previous = position;
        return stable;
      }, {timeout:15000, intervals:[100]}).toBeGreaterThanOrEqual(3);
    }
    async function clickSettled(locator) {
      await locator.scrollIntoViewIfNeeded();
      await settleScroll();
      await locator.click();
    }
    async function carouselState(selector, dotSelector, index, name) {
      await expect(page.locator(`${dotSelector}[data-slide="${index}"]`)).toHaveClass(/bg-brand/);
      const mobile = selector === '#mobile-testimonial-carousel';
      const percent = -index * (mobile ? 16.666 : 33.333);
      await expect.poll(() => page.locator(selector).evaluate(el => parseFloat(el.style.transform.match(/translateX\(([-\d.]+)%\)/)?.[1]))).toBeCloseTo(percent,3);
      actions.push({action:'observe carousel state',selector,index,percent});
      await capture(name);
    }
    await page.goto(base+'/ielts-online-coaching-gcc/', {waitUntil:'domcontentloaded'});
    await expect(page.getByRole('heading', {level:1})).toContainText('Best IELTS Coaching for GCC Students');
    await capture('before');
    if (feature === 'demo') {
      for (const width of [1440, 390]) {
        await page.setViewportSize({width, height:1000});
        const ctas = page.locator('button[onclick="openConsultationForm()"]');
        const count = await ctas.count();
        assert.ok(count > 0);
        for (let i=0; i<count; i++) {
          const cta = ctas.nth(i);
          if (!await cta.isVisible()) continue;
          actions.push({action:'click demo CTA', width, index:i, text:await cta.innerText()});
          await clickSettled(cta);
          if (width >= 768) {
            await expect(page.locator('#consultation-modal')).toBeVisible();
            await expect(page.locator('#consultation-modal h3')).toHaveText('Register For Free 1:1 Demo Class');
            await expect(page.locator('#consultation-modal iframe')).toHaveAttribute('data-tally-src', /tally\.so\/embed\/aQXeqq/);
            await capture(`demo-${width}-${i}`);
            await page.locator('#consultation-modal button[onclick="closeConsultationForm()"]',).click();
            await expect(page.locator('#consultation-modal')).toBeHidden();
            if (i === 0) {
              await cta.click();
              await expect(page.locator('#consultation-modal')).toBeVisible();
              actions.push({action:'click modal backdrop',width});
              await page.locator('#consultation-modal').click({position:{x:5,y:5}});
              await expect(page.locator('#consultation-modal')).toBeHidden();
            }
          } else {
            await expect(page.locator('#mobile-form-section')).toBeInViewport({ratio:0.1, timeout:15000});
            await settleScroll();
            await expect(page.locator('#consultation-modal')).toBeHidden();
            await capture(`demo-${width}-${i}`);
          }
        }
      }
    } else if (feature === 'testimonials') {
      await page.locator('#testimonial-carousel').scrollIntoViewIfNeeded();
      await page.locator('.carousel-dot[data-slide="0"]').click();
      actions.push({action:'click next testimonial'});
      await clickSettled(page.locator('#next-btn'));
      await carouselState('#testimonial-carousel','.carousel-dot',1,'testimonial-next');
      await page.locator('#prev-btn').click();
      await carouselState('#testimonial-carousel','.carousel-dot',0,'testimonial-prev');
      for (let i=0;i<3;i++) {
        actions.push({action:'click desktop testimonial dot',index:i});
        await clickSettled(page.locator(`.carousel-dot[data-slide="${i}"]`));
        await carouselState('#testimonial-carousel','.carousel-dot',i,`testimonial-desktop-${i}`);
      }
      actions.push({action:'observe desktop autoplay from slide 2 to 0'});
      await expect(page.locator('.carousel-dot[data-slide="0"]')).toHaveClass(/bg-brand/, {timeout:6500});
      await carouselState('#testimonial-carousel','.carousel-dot',0,'testimonial-desktop-auto');
      await page.setViewportSize({width:390,height:1000});
      for (let i=0;i<6;i++) {
        actions.push({action:'click mobile testimonial dot',index:i});
        await clickSettled(page.locator(`.mobile-carousel-dot[data-slide="${i}"]`));
        await carouselState('#mobile-testimonial-carousel','.mobile-carousel-dot',i,`testimonial-mobile-${i}`);
      }
      actions.push({action:'observe mobile autoplay from slide 5 to 0'});
      await expect(page.locator('.mobile-carousel-dot[data-slide="0"]')).toHaveClass(/bg-brand/, {timeout:6500});
      await carouselState('#mobile-testimonial-carousel','.mobile-carousel-dot',0,'testimonial-mobile-auto');
    } else if (feature === 'trainers') {
      const desktopDetails = page.locator('#trainers details + div');
      await expect(desktopDetails).toHaveCount(4);
      for (let i=0;i<4;i++) {
        await expect(desktopDetails.nth(i)).toBeVisible();
        await expect(desktopDetails.nth(i)).toContainText('Key Strengths:');
      }
      await page.locator('#trainers').scrollIntoViewIfNeeded();
      await settleScroll();
      actions.push({action:'observe four desktop trainer detail panels'});
      await capture('trainers-desktop');
      await page.setViewportSize({width:390,height:1000});
      const details = page.locator('#trainers details');
      await expect(details).toHaveCount(4);
      for (let i=0; i<await details.count(); i++) {
        actions.push({action:'toggle trainer details',index:i});
        await clickSettled(details.nth(i).locator('summary'));
        await expect(details.nth(i)).toHaveAttribute('open','');
        await expect(details.nth(i).locator('div').first()).toBeVisible();
        await capture('trainer-'+i);
        await details.nth(i).locator('summary').click();
        assert.equal(await details.nth(i).getAttribute('open'),null);
      }
    } else if (feature === 'thank-you') {
      await page.goto(base+'/ielts-online-coaching-gcc/thank-you.html', {waitUntil:'domcontentloaded'});
      await expect(page.getByRole('heading', {level:1})).toHaveText('Thank You for Registering!');
      assert.equal(await page.getByRole('link', {name:'Call: +91 92281 22552'}).getAttribute('href'), 'tel:+919228122552');
      assert.equal(await page.getByRole('link', {name:'Call Now', exact:true}).getAttribute('href'), 'tel:+919228122552');
      await capture('thank-you');
      actions.push({action:'click Back to GCC IELTS Coaching Page'});
      await page.getByRole('link', {name:'← Back to GCC IELTS Coaching Page'}).click();
      await expect(page.getByRole('heading', {level:1})).toContainText('Best IELTS Coaching for GCC Students');
      await page.goto(base+'/ielts-online-coaching-gcc/thank-you.html', {waitUntil:'domcontentloaded'});
      actions.push({action:'click header Back to Home'});
      await page.getByRole('link', {name:'Back to Home', exact:true}).click();
      await expect(page.getByRole('heading', {level:1})).toContainText('Best IELTS Coaching for GCC Students');
    }
    await capture('after');
    fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({feature,status:'passed',actions,errors,limitations:['No Tally submission, CRM persistence, actual telephone call, or analytics delivery verified.']},null,2));
  } catch (error) {
    if (page) {
      await page.screenshot({path:path.join(out,'failure.png'), timeout:5000}).catch(() => {});
      fs.writeFileSync(path.join(out,'failure.aria.txt'), await page.locator('body').ariaSnapshot().catch(() => 'snapshot unavailable'));
    }
    fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({feature,status:'failed',error:String(error),actions,errors},null,2));
    throw error;
  } finally {
    fs.writeFileSync(path.join(out,'console.json'),JSON.stringify(consoleMessages,null,2));
    fs.writeFileSync(path.join(out,'requests.json'),JSON.stringify(requests,null,2));
    if (context) {
      try { await context.tracing.stop({path:path.join(out,'trace.zip')}); }
      finally { await context.close(); }
    }
    await browser.close();
  }
}
main().catch(error => {console.error(error);process.exitCode=1;});
