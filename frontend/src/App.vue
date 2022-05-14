<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand float-left" href="/">
          <img
            alt="Vue logo"
            src="./assets/logo.svg"
            width="30"
            height="30"
            class="d-inline-block align-text-top"
          />
          Onboarding Deluxe
        </a>
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/activities">Activities</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/clients">Clients</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/events">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/workers">Workers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/organizations">Organizations</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view - our main view below the navigation -->
    <div class="container mt-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>


