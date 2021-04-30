<template>
  <div class="grid place-items-center">

    <div class="row-start-1 title mt-space50px">
      <h1 class="text-grey_text font-normal text-size42"> <span class="font-bold text-green_main text-size42">Easy</span>ToDo </h1>
    </div>

    <div class="row-start-2 mt-space50px">
      <input 
        type="text"
        class="w-width200px rounded-l h-height35px bg-white text-grey_placeholder"
        :placeholder="placeholder"
        @keyup.enter="addToDo"
        v-model="newToDo.name"
      >
      <button 
        class="button-create-to-do w-width105px rounded-r h-height35px bg-green_main text-white"
        @click="addToDo"> 
          Create To-Do 
      </button>
    </div>

    <div class="row-start-3 mt-space25px">

      <div v-if="toDoList.length > 0">
        <p class="text-grey_text mb-space10px text-size14 leading-line_height16px"> All To-Do's</p>

        <div 
          class="mb-space10px"
          v-for="toDo in toDoList" 
          :key="toDo.id">

          <div v-if="!toDo.check">
            <span class="show-to-do w-width245px rounded-l h-height30px bg-white text-grey7"> {{toDo.name}} </span>
            <!--Calling of the method toDoAction with the id of the selected toDo and the action to do with it -->
            <button @click="toDoAction(toDo.id, 'delete')" class="trash-button w-width30px rounded-r h-height30px bg-orange"> <img src="@/assets/Vector.svg" class="bg-orange text-white"/> </button>
            <button @click="toDoAction(toDo.id, 'check')" class="check-button w-width30px h-height30px bg-green_actiontext"> <CheckIcon class="bg-green_actiontext text-white"/> </button>
          </div>

          <div v-else>
            <button class="check-button w-width30px rounded-l h-height30px bg-green_actiontext" :style='buttonChecked'> <CheckIcon class="bg-green_actiontext text-white"/> </button>
            <button @click="toDoAction(toDo.id, 'delete')" class="trash-button w-width30px rounded-r h-height30px bg-orange"> <img src="@/assets/Vector.svg" class="bg-orange text-white"/> </button>
            <span class="show-to-do w-width245px h-height30px text-white bg-green_actiontext" :style="greenBackground"> {{toDo.name}} </span>
          </div>

        </div> 

      </div>

      <div v-else class="mt-5 text-grey7">
        <p> Let's write some more tasks to do ! </p>
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { CheckIcon } from '@heroicons/vue/outline'

export default {

  data() {
    return {
      newToDo: {},
      id: 0,
      placeholder: "Enter something to-do...",

      greenBackground: {
        "padding-left": "2px"
      },

      buttonChecked: {
        float: "left",
      }
    }
  },

  components: {
    CheckIcon
  },

  computed: {
    ...mapGetters({
      toDoList: 'getToDoList',
    }),
  },

  methods: {
    addToDo() {
      if(!this.newToDo) {
        return
      }

      if(!this.newToDo.name) {
        this.placeholder = "You need to write something"
      } else {
        this.newToDo.id = this.id
        this.$store.dispatch('add_toDo', this.newToDo)

        //reinit values
        this.id ++
        this.newToDo = {}
        this.placeholder = "Enter something to-do..."
      }
    },

    toDoAction(id, action) {
      let values = {id, action}
      this.$store.dispatch('toDoAction', values)
    },
  }

}
</script>


<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
   url(./assets/css/fonts/Roboto-Light.ttf) format("truetype");
}

* 
{
  background-color: #F5F5F5;
  font-family: "Roboto";
  font-size: 12px;
  line-height: 14px;
}

input[type="text"]
{
  padding: 11px 0px 10px 8px
}

.button-create-to-do {
  float: right;
  font-size: 14px;
  line-height: 16px;
}

.trash-button {
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-button {
  float:right;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px
}

.show-to-do {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px 2px 8px 8px;
}

</style>
