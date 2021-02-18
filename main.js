var app = new Vue({
  el: '#app',
  data:{
    name: 'iwan',
    errorMsg: false,
    successMsg: false,
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    users:[],
    newUser:{name:"",email:"",phone:""},
    currentUser:{}
  },
  mounted: function(){
    this.getAllUsers();
  },
  methods:{
    getAllUsers(){
      axios.get("http://localhost/vuecrud/api.php?method=read")
      .then(function(response){
        if(response.data.error){
          app.errorMsg = response.data.message;
        }else{
          app.users = response.data.users;
        }
      })
    },
    addUser(){
      var formData = app.toFormData(app.newUser);
      axios.post("http://localhost/vuecrud/api.php?method=create", formData)
      .then(function(response){
        app.newUser = {name: "",email: "",phone:""};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      })
    },
    updateUser(){
      var formData = app.toFormData(app.currentUser);
      axios.post("http://localhost/vuecrud/api.php?method=update", formData)
      .then(function(response){
        app.currentUser = {};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      })
    },
    deleteUser(){
      var formData = app.toFormData(app.currentUser);
      axios.post("http://localhost/vuecrud/api.php?method=delete", formData)
      .then(function(response){
        app.currentUser = {};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      })
    },
    toFormData(obj){
      var fd = new FormData();
      for(var i in obj){
        fd.append(i,obj[i]);
      }
      return fd;
    },
    selectUser(user){
      app.currentUser = user;
    },
    clearMsg(){
      app.errorMsg = '';
      app.successMsg = '';
    }

  }
});