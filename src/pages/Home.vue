<template>
  <q-page>
    <!-- <div class="row q-mx-auto justify-center align-center">
      <div class="col-12 col-lg-6 self-center">
        <q-card flat class="q-pa-xl">
          <q-card-section class="text-h4">
            About
          </q-card-section>
          <q-card-section>
            This is the online portal of the NIS Pavlodar school for students
            and teachers dedicated to project contests work
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-lg-6">
        <q-card flat class="q-pa-xl">
          <q-card-section class="text-h4">
            Upcoming Project Contests
          </q-card-section>
          <q-card-section>
            text
          </q-card-section>
        </q-card>
      </div>
    </div> -->
    <div class="row">
      <q-parallax
        src="https://i3.photo.2gis.com/images/branch/0/30258560049603441_1424.jpg"
      >
        <div class="text-h3 text-white text-center">
          Проектная деятельность НИШ Павлодар
        </div>
      </q-parallax>
    </div>
    <Section img="code.jpg" />
    <Features :data="features" />
    <a id="news" />
    <Newsletter />
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
