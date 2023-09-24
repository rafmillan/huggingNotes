"use client"
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { generateRandomNumber } from "@/lib/util/random";
import { DEFAULT_NOTE_CONTENT } from "@/ui/components/editor/tiptap";
import { removeFirstOccurrence } from "./util";

export const LS_KEY = "notes.app"

export function createNote() {
  const id = generateRandomNumber()
  const content = JSON.stringify(DEFAULT_NOTE_CONTENT)

  let currentNotes = JSON.parse(window.localStorage.getItem(LS_KEY) as string)
  if (currentNotes ===  null) {
    window.localStorage.setItem(LS_KEY, `{"notes":[]}`)
    currentNotes = JSON.parse(window.localStorage.getItem(LS_KEY) as string)
  }
  const NewNotes = {'notes': [
    ...currentNotes.notes,
    id
  ]}
  window.localStorage.setItem(`${id}`, content)
  window.localStorage.setItem(LS_KEY, JSON.stringify(NewNotes))
}

export function createNoteFromFile(body: string, title: string) {
  const id = generateRandomNumber()
  const newContent = {
    'title': title,
    'content': body
  }
  const content = JSON.stringify(newContent)

  let currentNotes = JSON.parse(window.localStorage.getItem(LS_KEY) as string)
  if (currentNotes ===  null) {
    window.localStorage.setItem(LS_KEY, `{"notes":[]}`)
    currentNotes = JSON.parse(window.localStorage.getItem(LS_KEY) as string)
  }
  const NewNotes = {'notes': [
    ...currentNotes.notes,
    id
  ]}
  window.localStorage.setItem(`${id}`, content)
  window.localStorage.setItem(LS_KEY, JSON.stringify(NewNotes))
  return id
}

export function getNotes() {
  let ls = window.localStorage.getItem(LS_KEY)
  if (ls === null ) {
    window.localStorage.setItem(LS_KEY, `{"notes":[]}`)
    ls = window.localStorage.getItem(LS_KEY)
  }
  return JSON.parse(ls as string)
}

export function getNote(id: string) {
  const note  = window.localStorage.getItem(id)
  return note
  // if (note === null || note === "" || note == undefined) {
  //   return ""
  // } else {
  //   return JSON.parse(note)
  // }
}

export function setNote(id: string, newNote: string) {
  window.localStorage.setItem(id, newNote)
  return
}

export function deleteNote(id: string) {
  let notes = window.localStorage.getItem(LS_KEY)
  if (notes === null ) return
  let notesJSON = JSON.parse(notes)
  removeFirstOccurrence(id, notesJSON.notes)
  window.localStorage.setItem(LS_KEY, JSON.stringify(notesJSON))
  window.localStorage.removeItem(id)
  return
}