import { EmaxonPage } from './app.po';

describe('emaxon App', () => {
  let page: EmaxonPage;

  beforeEach(() => {
    page = new EmaxonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
