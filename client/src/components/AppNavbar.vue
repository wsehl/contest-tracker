<template>
  <q-header height-hint="61.59" class="header">
    <div class="container mx-auto">
      <q-toolbar class="q-py-md q-px-lg">
        <router-link :to="{ name: 'Home' }">
          <q-btn round dense flat color="white" no-caps>
            <svg
              width="35"
              height="35"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16C0 10.3995 0 7.59921 1.08993 5.46009C2.04867 3.57847 3.57847 2.04867 5.46009 1.08993C7.59921 0 10.3995 0 16 0H29C34.6005 0 37.4008 0 39.5399 1.08993C41.4215 2.04867 42.9513 3.57847 43.9101 5.46009C45 7.59921 45 10.3995 45 16V29C45 34.6005 45 37.4008 43.9101 39.5399C42.9513 41.4215 41.4215 42.9513 39.5399 43.9101C37.4008 45 34.6005 45 29 45H16C10.3995 45 7.59921 45 5.46009 43.9101C3.57847 42.9513 2.04867 41.4215 1.08993 39.5399C0 37.4008 0 34.6005 0 29V16Z"
                fill="#0057FF"
              />
              <path
                d="M24.5556 37H12.1111C10.3929 37 9 35.6071 9 33.8889V12.1111C9 10.3929 10.3929 9 12.1111 9H33.8889C35.6071 9 37 10.3929 37 12.1111V24.5556C36.9993 24.5735 36.9962 24.5913 36.9907 24.6084C36.9862 24.6226 36.9831 24.6372 36.9813 24.652C36.9725 24.7892 36.9459 24.9246 36.902 25.0549L36.888 25.0969C36.8775 25.132 36.8645 25.1663 36.8491 25.1996C36.7738 25.369 36.6684 25.5234 36.538 25.6553L25.6491 36.5442C25.359 36.8344 24.9659 36.9983 24.5556 37ZM12.1111 12.1111V33.8889H23V24.5556C23 23.6964 23.6964 23 24.5556 23H33.8889V12.1111H12.1111ZM26.1111 26.1111V31.6909L31.6893 26.1111H26.1111Z"
                fill="white"
              />
            </svg>
          </q-btn>
        </router-link>
        <div
          v-if="$q.screen.gt.xs"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-medium row items-center no-wrap"
        >
          <router-link :to="{ name: 'About' }" class="router-link">
            О проекте
          </router-link>
          <router-link :to="{ name: 'Events' }" class="router-link">
            Конкурсы
          </router-link>
        </div>
        <q-space />
        <div class="q-pl-sm row items-center no-wrap">
          <div
            class="q-gutter-md text-body2 text-weight-medium row items-center no-wrap"
          >
            <template v-if="user && user.role === 'Admin'">
              <router-link :to="{ name: 'Dashboard' }" class="router-link">
                Админ-панель
              </router-link>
            </template>
            <template v-if="user">
              <q-btn dense flat no-wrap>
                <div class="q-body-2" style="text-transform: none">
                  {{ user.username }}
                </div>
                <q-icon name="arrow_drop_down" size="16px" />
                <q-menu auto-close>
                  <q-list dense>
                    <q-item
                      clickable
                      class="GL__menu-link"
                      :to="{
                        name: 'Account',
                      }"
                    >
                      <q-item-section>Аккаунт</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      class="GL__menu-link"
                      :to="{
                        name: 'Help',
                      }"
                    >
                      <q-item-section>Помощь</q-item-section>
                    </q-item>
                    <q-item clickable class="GL__menu-link" @click="logout">
                      <q-item-section>Выход</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </template>
            <template v-else>
              <router-link :to="{ name: 'Login' }" class="router-link">
                Войти
              </router-link>
              <router-link :to="{ name: 'Signup' }" class="router-link">
                Зарегистрироваться
              </router-link>
            </template>
          </div>
        </div>
      </q-toolbar>
    </div>
  </q-header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    ...mapActions({
      logout: "logout",
    }),
  },
};
</script>

<style lang="sass" scoped>
.router-link
  color: #4a4a4a
  text-decoration: none
  &:hover
    opacity: 0.7
.router-link-active
  color: #0057ff

.header
  background: #fff
  border-bottom: 1px solid #ebeaeb
  color: #4a4a4a

.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
