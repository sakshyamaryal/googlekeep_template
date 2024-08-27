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
        @click="getNoteContent(note.id, note.title, note.text)"
        :data-noteid="note.id"
        :noteContent="noteContent"
        :noteTitle="noteTitle"
        :user_id="note.user_id"
        :editable="isEditing"
      />
    </div>
  </div>

  <Modal :visible="showModal" @updateNote="update">
    <template v-slot:header>
      <input type="text" class="form-control border-0 shadow-none" v-model="noteTitle" />
    </template>
    <template v-slot:body>
      <textarea
        class="form-control border-0 shadow-none"
        v-model="noteContent"
        maxLength="160"
        style="resize: none"
      ></textarea>
      <Icon :onClose="checkModal"></Icon>
    </template>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import FormComponent from './Reusable/FormComponent.vue'
import AddedNoteComponent from './Reusable/AddedNoteComponent.vue'
import Modal from './Reusable/Modal.vue'
import Icon from './icons/Icons.vue'
import { ref, watch } from 'vue'
// import { userId  } from './auth/Authenticate'

export default {
  // setup() {
  //   const userid = ref(userId())

  //   return {
  //     userid
  //   }
  // },
  components: {
    FormComponent,
    AddedNoteComponent,
    Modal,
    Icon
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
      showModal: false,
      currentUserDetail: []
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
        } else {
          updatedNote.user_id = localStorage.getItem('userid')
        }

        if (this.isEditing) {
          await this.updateNote(updatedNote)
        } else {
          await this.addNote(updatedNote)
          this.isNoteAdded = this.$store.getters.getAddState
        }

        this.resetForm()
      }
    },
    update() {
      alert('update called')
      const note = {
        title: this.noteTitle,
        text: this.noteContent,
        id: this.noteId
      }
      this.saveNote(note)
      this.checkModal()
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
    },
    async getNotes() {
      // console.log(localStorage.getItem('userid'), ' is the user id')
      await this.fetchNotes(localStorage.getItem('userid'))

      this.notes = this.$store.getters.getNotes
    },

    checkModal() {
      if (this.showModal) {
        this.showModal = false
      } else {
        this.showModal = true
      }
    },

    getNoteContent(noteid, title, text) {
      this.showModal = true
      this.noteContent = text
      this.noteTitle = title

      console.log(text)
    }
  },
  mounted() {
    this.isNoteAdded = this.$store.getters.getAddState
    // console.log(this.isNoteAdded)
    this.getNotes()
    // this.currentUserDetail = this.$store.getters.getCurrentUserDetail
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
