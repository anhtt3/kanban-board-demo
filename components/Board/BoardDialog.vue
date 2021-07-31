<template>
  <v-dialog
    :value="value" @input="$emit('input')"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Board Name"
                v-model="boardEdit.name"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
            >
              <v-textarea
                dense
                rows="4"
                label="Description"
                v-model="boardEdit.description"
              ></v-textarea>
            </v-col>
            <v-col>
              <div class="subheading pt-4">
                Choose image background:
              </div>
              <v-row>
                <v-col v-for="img in imgBackgrounds" :key="img.id" cols="4">
                  <v-img
                    :src="img.smallUrl"
                    aspect-ratio="1"
                    height="160"
                    width="160"
                    class="cursor-pointer background-item"
                    :class="{selected : (img.id === selected) }"
                    @click="selected = img.id; chooseBackground(img.id)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="closeDialog"
        >
          Close
        </v-btn>
        <!--          Simplify validation-->
        <!--          We could use validation libs such as Vuelidate in real project-->
        <v-btn
          color="blue darken-1"
          text
          :disabled="!boardEdit.name"
          @click="saveBoard"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {backgroundData} from '~/assets/models/staticBackgroundList'

export default {
  props: ['value', 'boardDetail'],
  data() {
    return {
      imgBackgrounds: backgroundData,
      boardEdit: this.boardDetail ? {...this.boardDetail} : {
        name: "",
        description: "",
        image: backgroundData[0]
      },
      // SET DEFAULT BACKGROUND
      selected: this.boardDetail ? this.boardDetail.image.id : backgroundData[0].id
    }
  },
  methods: {
    chooseBackground(id) {
      this.boardEdit.image = this.imgBackgrounds.find(item => item.id === id);
    },
    closeDialog() {
      this.$emit('input');
    },
    saveBoard() {
      this.$emit('confirm', this.boardEdit)
    }
  }
}
</script>

<style lang="scss" scoped>
.background-item{
  border-radius: 5px;
  border: 2px solid transparent;
}
::v-deep .selected {
  border-color: #15C39A;
}
</style>
