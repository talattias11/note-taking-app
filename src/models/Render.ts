import {
  DATE_CLASSES,
  DELETE_BUTTON_CLASSES,
  DELETE_BUTTON_ICON,
  DESCRIPTION_CLASSES,
  LIST_ITEM_CLASSES,
  TITLE_CLASSES,
} from "../utils/constants";
import { Note } from "./Note";
import { NoteList } from "./NoteList";

export class Render {
  noteListElement: HTMLUListElement = document.querySelector(
    "#noteList"
  ) as HTMLUListElement;

  noteList: NoteList;

  constructor(noteList: NoteList) {
    this.noteList = noteList;
  }

  renderList(notes: Note[]) {
    this.noteListElement.innerHTML = "";
    notes.forEach((note) => {
      const listItem = this.createListItem(note.color);
      const title = this.createTitle(note.title);
      const dueDate = this.createDueDate(note.dueDate);
      const description = this.createDescription(note.description);
      const createdAt = this.createCreatedAt(note.createdAt.toString());
      const deleteButton = this.createDeleteButton(note.id);
      listItem.append(title, dueDate, description, createdAt, deleteButton);
      this.noteListElement.append(listItem);
    });
  }

  private createListItem(color: string) {
    const listItem = document.createElement("li");
    listItem.className = `${LIST_ITEM_CLASSES} ${color}`;
    return listItem;
  }

  private createTitle(title: string) {
    const noteTitle = document.createElement("h5");
    noteTitle.className = TITLE_CLASSES;
    noteTitle.textContent = title;
    return noteTitle;
  }

  private createDescription(description: string) {
    const noteDescription = document.createElement("p");
    noteDescription.className = DESCRIPTION_CLASSES;
    noteDescription.textContent = description;
    return noteDescription;
  }

  private createDueDate(dueDate: string) {
    const noteDueDate = document.createElement("span");
    noteDueDate.className = DATE_CLASSES;
    noteDueDate.textContent = dueDate;
    return noteDueDate;
  }

  private createCreatedAt(createdAt: string) {
    const noteCreatedAt = document.createElement("span");
    noteCreatedAt.className = DATE_CLASSES;
    noteCreatedAt.textContent = `Created at ${createdAt}`;
    return noteCreatedAt;
  }

  private createDeleteButton(id: string) {
    const button = document.createElement("button");
    button.ariaLabel = "Delete note button";
    button.className = DELETE_BUTTON_CLASSES;
    button.innerHTML = DELETE_BUTTON_ICON;
    button.addEventListener("click", () => {
      this.noteList.delete(id);
      this.renderList(this.noteList.notes);
    });
    return button;
  }

  sortByColor() {
    this.noteList.notes.sort((a, b) => {
      if (a.color < b.color) {
        return -1;
      }
      if (a.color > b.color) {
        return 1;
      }
      return 0;
    });

    this.noteList.saveToLocalStorage();
    this.renderList(this.noteList.notes);
  }

sortByTitle() {
  this.noteList.notes.sort((a, b) => {
    if(a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if(a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

this.noteList.saveToLocalStorage();
this.renderList(this.noteList.notes);
}

sortByCreatedDate() {
  this.noteList.notes.sort((a, b) => {
    if(a.createdAt < b.createdAt) {
      return -1;
    }
    if(a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });

  this.noteList.saveToLocalStorage();
  this.renderList(this.noteList.notes);
}
}

// <li class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//   <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//     Noteworthy technology acquisitions 2021
//   </h5>
//   <span class="text-sm text-gray-700 dark:text-gray-500">2020-10-20</span>
//   <p class="font-normal text-gray-700 dark:text-gray-400">
//     Here are the biggest enterprise technology acquisitions of 2021 so far, in
//     reverse chronological order.
//   </p>
//   <span class="text-sm text-gray-700 dark:text-gray-500">
//     Created At 2020-10-20
//   </span>
// </li>;
