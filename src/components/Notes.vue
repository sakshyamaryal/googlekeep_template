<template>
  <div>
    <FormComponent :note="{ title: noteTitle, text: noteContent }" @save-note="saveNote" />

    <AddedNoteComponent
      :note="note"
      @edit-note="editNote"
      @delete-note="deleteNote"
      :editable="isEditing"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormComponent from './Reusable/FormComponent.vue'
import AddedNoteComponent from './Reusable/AddedNoteComponent.vue'

export default {
  components: {
    FormComponent,
    AddedNoteComponent
  },
  data() {
    return {
      noteTitle: '',
      noteContent: '',
      isEditing: false,
      noteId: null,
      notes: [],
      clickedInput: false
    }
  },
  methods: {
    ...mapActions(['addNote', 'updateNote', 'fetchNotes']),
    async saveNote(note) {
      console.log('Saving Note:', note.title, note.text)
      if (note.text) {
        const updatedNote = {
          title: note.title,
          text: note.text
        }

        if (this.noteId) {
          updatedNote.id = this.noteId
          this.isEditing = true
        }

        if (this.isEditing) {
          await this.updateNote(updatedNote)
        } else {
          await this.addNote(updatedNote)
        }

        this.resetForm()
      } 
    },
    resetForm() {
      this.noteTitle = ''
      this.noteContent = ''
      this.isEditing = false
      this.noteId = null
    },
    editNote(note) {
      this.noteTitle = note.title
      this.noteContent = note.text
      this.isEditing = true
      this.noteId = note.id
    },
    async deleteNote(note) {
      await this.$store.dispatch('deleteNote', note.id)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.active-form form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}

.form-container {
  background: #fff;
  max-width: 598px;
  margin: 32px auto;
  box-shadow:
    0 1px 2px 0 rgb(60 64 67 / 30%),
    0 2px 6px 2px rgb(60 64 67 / 15%);
  border: 1px solid #e0e1e0;
  border-radius: 8px;
}

.form-container-notes {
  background: #fff;
  max-width: 220px;
  /* margin: 32px auto; */
  box-shadow:
    0 1px 2px 0 rgb(60 64 67 / 30%),
    0 2px 6px 2px rgba(0, 0, 0, 0.15);
  border: 1px solid #1e201e;
  border-radius: 8px;
  padding: 7px;
}

.contents-icon {
  display: flex;
}

.check-circle {
  background-color: rgb(149, 149, 149);
  padding: 5px;
  border-radius: 60%;
  width: 30px;
  margin-top: 0px;
  margin-left: -15px;
  /* background:white; */
}

.check-thumbtack {
  float: right;
  padding: 5px;
}
</style>
