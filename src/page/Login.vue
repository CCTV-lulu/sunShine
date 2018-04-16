<template>
      <div class="grid-content">
        <el-row>
          <el-col :span="9" :offset="6">
            <h1>{{msg}}</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
             <div>手机号：</div>
          </el-col>
          <el-col :span="9">
              <el-input v-model="telNumber"></el-input>
          </el-col>
          <el-col :span="5">
            <el-button type="text" @click="getMsCode" :disabled = isDisabled >{{SMSCodeText}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div>验证码：</div>
          </el-col>
          <el-col :span="9">
            <el-input v-model="codeNumber"></el-input>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="9" :offset="6">
            <el-button type="primary" class="big-button" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </div>
</template>

<script src="@/js/login.js"></script>
<style src="@/css/login.css" ></style>
