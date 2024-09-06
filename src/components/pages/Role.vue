<template>
  <div class="container mt-4">
    <h2 class="mb-4">Roles and Permissions</h2>

    <div class="card mb-4">
      <div class="card-header">
        <h5 class="card-title">Add New Role</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="createRole">
          <div class="form-group mb-3">
            <label for="roleName" class="form-label">Role Name:</label>
            <input
              v-model="newRoleName"
              type="text"
              id="roleName"
              class="form-control"
              placeholder="Enter new role name"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Role</button>
        </form>
      </div>
    </div>

    <!-- Roles Table -->
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Existing Roles</h5>
      </div>
      <div class="card-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Role</th>
              <th scope="col">Edit Permission</th>
              <th scope="col">Add Permission</th>
              <th scope="col">Delete Permission</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <th scope="row">{{ role.id }}</th>
              <td>{{ role.name }}</td>
              <td>
                <input
                  type="checkbox"
                  :checked="role.permissions.includes('edit')"
                  @change="updatePermission(role.id, 'edit', $event.target.checked)"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  :checked="role.permissions.includes('add')"
                  @change="updatePermission(role.id, 'add', $event.target.checked)"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  :checked="role.permissions.includes('delete')"
                  @change="updatePermission(role.id, 'delete', $event.target.checked)"
                />
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
      roles: [],
      newRoleName: '',
      bearertoken: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    }
  },
  methods: {
    async getRolesAndPermission() {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/rolesAndPermission',
          this.bearertoken
        )
        this.roles = response.data.data

        this.roles.forEach((role) => {
          role.permissions = role.permissions.map((permission) => permission.name)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async updatePermission(roleId, permissionType, isChecked) {
      try {
        await axios
          .post(
            'http://localhost:8000/api/updatePermission',
            {
              role_id: roleId,
              permission: permissionType,
              is_checked: isChecked
            },
            this.bearertoken
          )
          .then((res) => {
            if (res.data.success) {
              this.$toast.open({
                message: 'Permission Updated',
                type: 'success'
              })
            } else {
              this.$toast.open({
                message: 'Something Went Wrong',
                type: 'error'
              })
            }
            // console.log(res)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async createRole() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/createRole',
          {
            name: this.newRoleName
          },
          this.bearertoken
        )
        if (response) {
          this.$toast.open({
            message: 'New Role Added',
            type: 'success'
          })
        } else {
          this.$toast.open({
            message: 'Something Went Wrong',
            type: 'error'
          })
        }
        this.roles.push(response.data.data)
        this.newRoleName = ''
        console.log(this.roles)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.getRolesAndPermission()
  }
}
</script>

<style scoped>
.card-title {
  font-weight: bold;
}
</style>
