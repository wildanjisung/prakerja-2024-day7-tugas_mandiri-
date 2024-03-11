<script>
  import { useTodoStore } from './../stores/todo.js';

  export default {
    data() {
      return {
        isEdit: false
      }
    },
    computed: {
      index() {
        return this.$route.params.index
      },
      itemAtIndex() {
        const todoStore = useTodoStore();
        return todoStore.getItemByIndex(this.index);
      },
      renderDeskripsi: function () {
        if (this.itemAtIndex.deskripsi == null || this.itemAtIndex.deskripsi == '') {
          return 'Belum ada deskripsi nih'
        }
        return this.itemAtIndex.deskripsi
      },
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      updateItem(index, val) {
        const todoStore = useTodoStore();
        todoStore.editTodo(index, val);

        // reset index edit ke default
        this.isEdit = false;
      },
      toggleEdit(val) {
        this.isEdit = val
      }
    }
  }
</script>

<template>
  <!-- navigasi -->
  <button @click="goBack">Kembali</button>

  <!-- judul -->
  <h1>
    {{ itemAtIndex.name }}
  </h1>

  <!-- deskripsi -->
  <p v-if="!isEdit">{{ renderDeskripsi }}</p>
  <input v-if="isEdit" type="text" v-model="itemAtIndex.deskripsi">

  <!-- tombol ubah deskirpsi -->
  <button v-if="!isEdit" @click="toggleEdit">Ubah Deskripsi</button>
  <button v-if="isEdit" @click="updateItem(index, itemAtIndex)">Simpan</button>

</template>

