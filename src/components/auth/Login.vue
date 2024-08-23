<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  required
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <small>Sign-Up Here!<router-link to="/signup">Sign Up</router-link></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var store = new Vuex.Store({
//     state:{
//         submitted: false,

//     },
//     mutations: {
//         login(){
//             state.submitted = true;
//             return true;
//         }
//     }
// });

</script>
