import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../components/EditComponent.vue')
    },
    {
      path: '/edit/activity/:id',
      name: 'editactivities',
      component: () => import('../components/EditActivities.vue')
    },
    {
      path: '/edit/event/:id',
      name: 'editevents',
      component: () => import('../components/EditEvents.vue')
    },
    {
      path: '/edit/worker/:id',
      name: 'editworkers',
      component: () => import('../components/EditWorkers.vue')
    },
    {
      path: '/edit/org/:id',
      name: 'editorgs',
      component: () => import('../components/EditOrgs.vue')
    },
    {
      path: '/create/activity',
      name: 'createactivities',
      component: () => import('../create_views/CreateActivities.vue')
    },
    {
      path: '/create/client',
      name: 'createclients',
      component: () => import('../create_views/CreateClients.vue')
    },
    {
      path: '/create/org',
      name: 'createorgs',
      component: () => import('../create_views/CreateOrg.vue')
    },
    {
      path: '/create/worker',
      name: 'createworkers',
      component: () => import('../create_views/CreateWorker.vue')
    },
    {
      path: '/create/event',
      name: 'createevents',
      component: () => import('../create_views/CreateEvents.vue')
    },
    /*
    {
      path: '/create/client',
      name: 'createclients',
      component: () => import('../create_views/CreateClients.vue')
    },*/
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')

    },
    {
    //PROJECT 13 STUFF (DEV)
    path: '/activities',
    name: 'activities',
    component: () => import('../views/Activities.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/sin/activities/:id',
      name: 'singleactivity',
      component: () => import('../views/SingleActivity.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/clients',
      name: 'clients',
      component: () => import('../views/Clients.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/sin/clients/:id',
      name: 'singleclient',
      component: () => import('../views/SingleClient.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/events',
      name: 'events',
      component: () => import('../views/Events.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/sin/events/:id',
      name: 'singleevent',
      component: () => import('../views/SingleEvent.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/workers',
      name: 'workers',
      component: () => import('../views/Workers.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/sin/workers/:id',
      name: 'singleworker',
      component: () => import('../views/SingleWorker.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/organizations',
      name: 'organizations',
      component: () => import('../views/Organizations.vue')
    },
    {
      //PROJECT 13 STUFF (DEV)
      path: '/sin/organizations/:id',
      name: 'singleorganization',
      component: () => import('../views/SingleOrganization.vue')
    }
  ]
})

export default router
