describe('Tasks', function() {
  it('show all tasks', function() {
    browser.get('http://localhost:8888');
    expect(browser.getTitle()).toEqual('ToDo List');
    expect(element.all(by.css('.title')).count()).toEqual(10);
  });

  it('remove the task', function() {
    browser.get('http://localhost:8888');
    element(by.linkText('Remove')).click();
    element(by.buttonText('OK')).click();
    expect(element.all(by.css('.title')).count()).toEqual(9);
  });

  describe('Add a task', function() {
    it('with valid fields', function() {
      browser.get('http://localhost:8888');
      element(by.linkText('Add a task')).click();
      element(by.css('#title')).sendKeys('Some title');
      element(by.css('#description')).sendKeys('Some description');
      element(by.buttonText('Save')).click();
      expect(element.all(by.css('.title')).count()).toEqual(10);
    });

    it('with invalid fields', function() {
      browser.get('http://localhost:8888');
      element(by.linkText('Add a task')).click();
      element(by.buttonText('Save')).click();
      expect(browser.getCurrentUrl()).toContain('tasks/new');
    });
  });

  describe('Update the task', function() {
    it('with valid fields', function() {
      browser.get('http://localhost:8888');
      element(by.linkText('Edit')).click();
      element(by.css('#title')).clear();
      element(by.css('#title')).sendKeys('New Some title');
      element(by.buttonText('Save')).click();
      expect(element(by.css('.title')).getText()).toEqual('New Some title');
    });

    it('with invalid fields', function() {
      browser.get('http://localhost:8888');
      element(by.linkText('Edit')).click();
      var editUrl = browser.getCurrentUrl();
      element(by.css('#title')).clear();
      element(by.buttonText('Save')).click();
      expect(browser.getCurrentUrl()).toEqual(editUrl);
    });
  }); 
});