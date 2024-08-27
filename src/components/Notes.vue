<template>
  <div>
    <FormComponent
      :isNoteAdded="isNoteAdded"
      :note="{ title: noteTitle, text: noteContent }"
      @save-note="saveNote"
    />

    <div class="flex-notes">
      <AddedNoteComponent
        v-for="(note, index) in notes"
        :key="index"
        :note="note"
        @edit-note="editNote"
        @delete-note="deleteNote"
        :noteid="note.id"
        :user_id="note.user_id"
        :editable="isEditing"
      />
    </div>

    
  </div>

  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
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
      clickedInput: false,
      isNoteAdded: false,
      modalShow: false

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
          this.isNoteAdded = this.$store.getters.getAddState
          console.log(this.isNoteAdded, ' comes from parent')
          // console.log(note, " note");
          // if (this.isNoteAdded == true) {
          //   this.isNoteAdded = false
          // }
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
      console.log(note)
      this.noteTitle = note.title
      this.noteContent = note.text
      this.isEditing = true
      this.noteId = note.id
    },
    async deleteNote(note) {
      await this.$store.dispatch('deleteNote', note.id)
    },
    async getNotes() {
      await this.fetchNotes(1)
      // console.log(this.notes, ' is notes fetched')
      // setTimeout(() => {
      this.notes = this.$store.getters.getNotes
      console.log(this.notes, ' is notes fetched')

      // }, 2000)
    },
    
  },
  mounted() {
    this.isNoteAdded = this.$store.getters.getAddState
    // console.log(this.isNoteAdded)
    this.getNotes()
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

.contents-icon {
  display: flex;
}
</style>
