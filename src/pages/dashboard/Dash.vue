<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="text-white bg-blue-8">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Events</div>
                <div class="text-h5">13</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="trending_up" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="text-white bg-green-8">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Winners</div>
                <div class="text-h5">140</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="far fa-dot-circle" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="text-white bg-orange-9">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Users</div>
                <div class="text-h5">10</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="compare_arrows" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <div>
      <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                Sales vs Goals
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('bar')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                Market Share & Growth
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('line')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                Sales vs Quota
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('gauge')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">
              Key Competitors
              <q-btn
                flat
                dense
                icon="fas fa-download"
                class="float-right"
                @click="SaveImage('pie')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'"
              >
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">
              Sales Pipeline by Sales Rep
              <q-btn
                flat
                dense
                icon="fas fa-download"
                class="float-right"
                @click="SaveImage('stack_bar')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'"
              >
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-12">
        <q-card flat bordered class="bg-white">
          <q-table
            title="All Activities"
            :data="data"
            :hide-header="mode === 'grid'"
            :columns="columns"
            :grid="mode === 'grid'"
            :filter="filter"
            :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
          >
            <template v-slot:top-right="props">
              <q-input
                outlined
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
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
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      mode: "list",
      columns: [
        {
          name: "activity_id",
          align: "left",
          label: "Activity ID",
          field: "activity_id",
          sortable: true,
        },
        {
          name: "desc",
          required: true,
          label: "Activity Name",
          align: "left",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "regarding",
          align: "left",
          label: "Regarding",
          field: "regarding",
          sortable: true,
        },
        {
          name: "owner",
          align: "left",
          label: "Owner",
          field: "owner",
          sortable: true,
        },
        {
          name: "creation_date",
          align: "left",
          label: "Creation Date",
          field: "creation_date",
          sortable: true,
        },
      ],
      data: [
        {
          activity_id: "C001",
          name: "Advanced communications",
          regarding: "Presentation",
          owner: "John",
          creation_date: "12-09-2019",
        },
        {
          activity_id: "C002",
          name: "New drug discussion",
          regarding: "Meeting",
          owner: "John",
          creation_date: "09-02-2019",
        },
        {
          activity_id: "C003",
          name: "Universal services discussion",
          regarding: "Meeting",
          owner: "John",
          creation_date: "03-25-2019",
        },
        {
          activity_id: "C004",
          name: "Add on business",
          regarding: "Business",
          owner: "John",
          creation_date: "03-18-2019",
        },
        {
          activity_id: "C005",
          name: "Promotional Activity",
          regarding: "Personal",
          owner: "John",
          creation_date: "04-09-2019",
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.blue_dark {
  background-color: #082f56;
}

.green_dark {
  background-color: #084a0b;
}

.orange_dark {
  background-color: #64350e;
}
</style>
