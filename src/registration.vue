<template >
    <div id="hmrf">
        <form method="POST" action="\{\{route('musician.store')\}\}" class="form-horizontal">

                    <div class="alert alert-success" v-if="form.successful">
                        Success... you will be redirected to the next step! Enjoy :)
                    </div>
                    <!-- Name -->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Name*</label>

                        <div class="col-md-6">
                            <input type="text" class="form-control" name="name" v-model="form.name" required="required">

                            <span class="help-block">

                                    </span>
                        </div>
                    </div>

                    <!-- Username -->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Username*</label>

                        <div class="col-md-6">
                            <input type="text" class="form-control" name="username" v-model="form.username"
                                   required="required">

                            <span class="help-block">

                                    </span>
                        </div>
                    </div>

                    <!--Gender -->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Gender*</label>

                        <div class="col-md-6">
                            <select class="form-control" name="gender" v-model="form.gender" required="required">
                                <option value="0">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>

                            </select>
                            <span class="help-block">

                                    </span>
                        </div>
                    </div>

                    <!-- Birthdate -->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Birthdate*</label>

                        <div class="col-md-6">
                            <input type="date" class="form-control" name="birthdate" v-model="form.birthdate"
                                   required="required">

                            <span class="help-block">

                    </span>
                        </div>
                    </div>

                    <!-- Motto -->
                    <div class="form-group">
                        <label class="col-md-4 control-label">Motto</label>

                        <div class="col-md-6">
                    <textarea class="form-control" name="motto" cols="30" rows="4" placeholder="Motto"
                              v-model="form.motto">

                        </textarea>
                            <span class="help-block">

                                    </span>
                        </div>
                    </div>
        </form>
    </div>
</template>
<script>
export default {
        props: {
            profile: {
                type: Object,
                default(){
                    return {};
                },
                required: false
            },
            creating: {
                type: Boolean,
                default: false
            }
        },
        /**
         * The component's data.
         */
        data() {
            return {
                form:{
                    name: '',
                    username: '',
                    gender: '',
                    birthdate: '',
                    motto: ''
                },
            };
        },
        mounted() {
            if (this.creating) {
                this.form.gender = 0;
                return;
            }
            this.form.name = this.profile.name;
            this.form.username = this.profile.username;
            this.form.gender = this.profile.gender;
            this.form.birthdate = this.profile.birthdate;
            this.form.motto = this.profile.motto;
        },
        methods: {
            create(){
                Hype.post('/musician', this.form)
                        .then(() => {
                            Bus.$emit('musician-profile-created');
                            Bus.$emit('next-step','/musician/create/location');
                        });
            },
            update() {
                if (this.creating) {
                    return;
                }
                Hype.put('/musician', this.form)
                        .then(() => {
                            Bus.$emit('musicianProfileUpdated');
                        });
            }
        }
    };
</script>