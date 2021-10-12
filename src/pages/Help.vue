<template>
  <q-page class="q-page flex column items-center q-layout-padding">
    <div class="flex column items-center q-pb-md">
      <div class="text-h3">Help</div>
      <div class="text-subtitle1">Answers to frequently asked questions</div>
    </div>
    <q-card flat bordered :class="{ 'w-30': $q.screen.gt.md }">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="help"
          label="What is Сontest Tracker for?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="lock"
          label="How can I change or reset my password?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="email"
          label="Is it possible to receive notifications of new events by mail?"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
