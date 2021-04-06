<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Users"
        class="text-grey-8"
        :separator="separator"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="username"
        :grid="mode === 'grid'"
        :filter="filter"
        binary-state-sort
      >
        <template v-slot:top-right="props">
          <q-btn
            unelevated
            color="primary"
            label="Add user"
            @click="show_dialog = true"
            no-caps
          ></q-btn>
          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Add new item!</div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <q-input
                      v-model="editedItem.name"
                      label="Dessert Name"
                    ></q-input>
                    <q-input
                      v-model="editedItem.calories"
                      label="Calories"
                    ></q-input>
                    <q-input v-model="editedItem.fat" label="Fat"></q-input>
                    <q-input v-model="editedItem.carbs" label="Carbs"></q-input>
                    <q-input
                      v-model="editedItem.protein"
                      label="Protein"
                    ></q-input>
                    <q-input
                      v-model="editedItem.sodium"
                      label="Sodium"
                    ></q-input>
                    <q-input
                      v-model="editedItem.calcium"
                      label="Calcium"
                    ></q-input>
                    <q-input v-model="editedItem.iron" label="Iron"></q-input>
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="OK"
                    color="primary"
                    v-close-popup
                    @click="addRow"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <q-input outlined dense v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
              <q-popup-edit v-model="props.row.id">
                <q-input
                  v-model="props.row.id"
                  dense
                  autofocus
                  counter
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="username" :props="props">
              {{ props.row.username }}
              <q-popup-edit
                v-model="props.row.username"
                title="Update username"
                buttons
              >
                <q-input
                  type="number"
                  v-model="props.row.username"
                  dense
                  autofocus
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
              <q-popup-edit
                v-model="props.row.carbs"
                title="Update carbs"
                buttons
                persistent
              >
                <q-input
                  type="number"
                  v-model="props.row.carbs"
                  dense
                  autofocus
                  hint="Use buttons to close"
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="role" :props="props">{{ props.row.role }}</q-td>
            <q-td key="registered" :props="props">{{
              props.row.registered
            }}</q-td>
            <q-td key="last_login" :props="props">{{
              props.row.last_login
            }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn
                @click="editItem(props.row)"
                icon="card_giftcard"
                size="sm"
                no-caps
                round
                unelevated
                outline
              ></q-btn>
              <q-btn
                @click="deleteItem(props.row)"
                icon="card_giftcard"
                size="sm"
                no-caps
                round
                unelevated
                outline
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import api from "@/services/api.js";
// eslint-disable-next-line no-unused-vars
import { format } from "date-fns";

export default {
  methods: {
    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },
    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    close() {
      this.show_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
  data() {
    return {
      filter: "",
      mode: "list",
      separator: "vertical",
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        sodium: 0,
        calcium: "0%",
        iron: "0%",
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        sodium: 0,
        calcium: "0%",
        iron: "0%",
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "id",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "username",
          align: "left",
          label: "Username",
          field: "username",
          sortable: true,
        },
        { name: "role", label: "Role", field: "role" },
        {
          name: "registered",
          label: "Registered at",
          field: "registered",
          // format: (val) => {
          //   let result = format(val, "MM/dd/yyyy");
          //   console.log(val, result);
          // },
          // eslint-disable-next-line no-unused-vars
        },
        {
          name: "last_login",
          label: "Last login",
          field: "last_login",
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
        },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%",
        },
      ],
    };
  },
  async created() {
    try {
      const response = await api.getUsersTable();
      console.log(response.data);
      this.data = response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};
</script>
