import { chromium } from 'playwright';
//node tests/e2e.js
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173/');
    console.log('Page chargée');

    // Démarrer le jeu
    await page.getByRole('button', { name: /commencer l'énigme/i }).click();

    // 1. Résoudre StrongBox (code = 1234)
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '4' }).click();

    if (await page.locator('text=Succès 🎉 ! Code correct.').isVisible()) {
      console.log('StrongBox réussi !');
    } else {
      console.log('Échec StrongBox');
    }

    // 2. Résoudre HiddenWord (mot = MYSTERE)
    await page.getByPlaceholder('Entrez votre réponse').fill('MYSTERE');
    await page.getByRole('button', { name: /valider/i }).click();

    if (await page.locator('text=Bravo ! Vous avez trouvé le mot.').isVisible()) {
      console.log('HiddenWord réussi !');
    } else {
      console.log('Échec HiddenWord');
    }

    // 3. Résoudre ColorButton (séquence : Vert, Jaune, Orange)
    await page.getByRole('button', { name: 'Vert' }).click();
    await page.getByRole('button', { name: 'Jaune' }).click();
    await page.getByRole('button', { name: 'Orange' }).click();

    if (await page.locator('text=Bravo, vous avez trouvé la séquence complète').isVisible()) {
      console.log('ColorButton réussi !');
    } else {
      console.log('Échec ColorButton');
    }

    // Page de succès
    if (await page.locator('text=Victoire Éclatante').isVisible()) {
      console.log('Victoire finale !');
    } else {
      console.log('Pas de victoire finale');
    }
  } catch (err) {
    console.error('Erreur pendant le test :', err);
  } finally {
    await browser.close();
  }
})();
