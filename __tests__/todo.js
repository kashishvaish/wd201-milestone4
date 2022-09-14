let todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
/* eslint-disable no-undef */
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(todoItemsCount + 1);
  });

  test("Should mark a Todo as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should return overdue items", () => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "An overdue test item",
      completed: false,
      dueDate: new Date(today.getTime() - 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
  });

  test("Should return items due today", () => {
    const today = new Date();
    add({
      title: "A test item due today",
      completed: false,
      dueDate: new Date(today.getTime()).toLocaleDateString("en-CA"),
    });
    dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(3);
  });

  test("Should return items due later", () => {
    const today = new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    add({
      title: "A test item due later",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay).toLocaleDateString(
        "en-CA"
      ),
    });
    dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1);
  });
});
