
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { loginByAccount } from "../../apis/queryfn/login";
import { message } from "antd";
import { saveUserInfoToSession } from "../../util/userInfo";


function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleAccountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setAccount(value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPassword(value);
  }

  async function handleLoginClick(event: React.MouseEvent){
    event.preventDefault();
    const res = await loginByAccount(account,password);
    console.log(res);
    if(res.msg==='success'){
      saveUserInfoToSession(res.data)
      message.success("登陆成功，即将跳转")
      setTimeout(() => {
        navigate('/personal');
      }, 1000);
    }
    else{
      message.error("账号或密码错误！")
    }
  }

  return (
    <div>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center ">
              <h1 className="text-5xl font-bold">登 录</h1>
              <p className="py-6">
                登入从而进入“借阅灵”智慧图书管理系统，畅游书海
              </p>
            </div>
            <div className="card w-full max-w-md shrink-0 bg-base-100 shadow-2xl">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">帐号</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Account"
                      value={account}
                      onChange={handleAccountChange}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">密码</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="grow"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span className="text-sm text-red-500">{}</span>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button
                    className="btn glass bg-emerald-600 hover:bg-stone-400"
                    disabled={!(account !== "" && password !== "")}
                    onClick={handleLoginClick}
                  >
                    登陆
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
