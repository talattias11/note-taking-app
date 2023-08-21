import { Note } from "./Note";

export class NoteList {
  notes: Note[] = JSON.parse(localStorage.getItem("notes")!) || [];

  create(title: string, description: string, dueDate: string, color: string) {
    const note = new Note(title, description, dueDate, color);
    this.notes.push(note);
    this.saveToLocalStorage();
  }

  update(id: string, update: Partial<Note>) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...update };
      } else {
        return note;
      }
    });
    this.saveToLocalStorage();
  }

  delete(id: string) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveToLocalStorage();
  }

  search(searchTerm: string) {
    return this.notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }

  get notesObjects() {
    return this.notes.map(({ title, description, dueDate, color }) => {
      return new Note(title, description, dueDate, color);
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

}
