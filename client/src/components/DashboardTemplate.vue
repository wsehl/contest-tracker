<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <slot name="form"></slot>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card flat bordered>
        <slot name="table"></slot>
      </q-card>
    </div>
  </div>
</template>
