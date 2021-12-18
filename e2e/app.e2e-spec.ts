import { angularTemplatePage } from './app.po';

describe('angular App', function() {
  let page: angularTemplatePage;

  beforeEach(() => {
    page = new angularTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
