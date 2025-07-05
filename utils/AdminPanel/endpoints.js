// src/utils/AdminPanel/endpoints.js

export const alumniEps = {
  // USER routes
  user: {
    signup:        "/user/signup",           // POST { rank, email, password, name, [linkedinURL] }
    verify:        "/user/signup/verify",    // POST { rank, email, password, name, [linkedinURL], otpAttempt }
    login:         "/user/login",            // POST { rank, email, password }
    get:           "/user/get",              // POST { userID }
    getByToken:    "/user/get",              // GET  (with Authorization header)
    getAll:        "/user/getAll",           // GET  (admin only)
    getPending:    "/user/getPending",       // GET  (admin only)
    edit:          "/user/edit",             // PUT  { userID, …fields }
    delete:        "/user/delete"            // POST { userID }
  },

  // VERIFICATION convenience aliases
  verification: {
    getAll:   "/user/getPending",            // same as user.getPending
    approve:  "/user/edit",                  // same as user.edit
    reject:   "/user/delete"                 // same as user.delete
  },

  // JOB routes
  jobs: {
    getAll: "/job/getAll",                   // GET
    add:    "/job/create",                   // POST { …jobData }
    edit:   "/job/edit",                     // PUT  { jobID, …updates }
    delete: "/job/delete"                    // POST { jobID }
  },

  // NEWS routes
  news: {
    getAll: "/news/getAll",                  // GET
    add:    "/news/create",                  // POST { …newsData }
    edit:   "/news/edit",                    // PUT  { newsID, …updates }
    delete: "/news/delete"                   // POST { newsID }
  }
};
