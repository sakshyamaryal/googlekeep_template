<template>
  <div class="container mt-4">
    <!-- <h2 class="mb-4">User Management</h2> -->
    <router-link to="/role" class="btn btn-danger mb-4"> Manage Roles And Privellege </router-link>

    <div class="card">
      <div class="card-header">
        <h5 class="card-title">User List</h5>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Current Role</th>
              <th scope="col">Assign Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.userrole ? user.userrole : 'N/A' }}</td>
              <td>
                <select
                  v-model="user.selectedRole"
                  @change="updateUserRole(user.id, user.selectedRole)"
                  class="form-select"
                >
                  <option value="">Mark As</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      roles: [],
      bearertoken: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users', this.bearertoken)
        this.users = response.data.data
      } catch (error) {
        console.log(error)
      }
    },

    async getRoles() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/rolesAndPermission',
          this.bearertoken
        )
        this.roles = response.data.data

        this.users.forEach((user) => {
          const userRole = this.roles.find((role) => role.id === user.role_id)
          user.selectedRole = userRole ? userRole.id : ''
        })
      } catch (error) {
        console.log(error)
      }
    },

    async updateUserRole(userId, roleId) {
      try {
        await axios
          .post(
            'http://localhost:8000/api/updateUserRole',
            {
              user_id: userId,
              role_id: roleId
            },
            this.bearertoken
          )
          .then((res) => {
            if (res.data.success) {
              this.$toast.open({
                message: 'User Role Updated',
                type: 'success'
              })
            } else {
              this.$toast.open({
                message: 'Something Went Wrong',
                type: 'error'
              })
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getUsers()
    this.getRoles()
  }
}
</script>

<style scoped>
.card-title {
  font-weight: bold;
}
</style>
