import { sha512 } from 'js-sha512';
// Redux関連
import { useSelector } from '../store/store';

export const useLogin = () => {
  // Redux==========
  // const
  type User = {
    name: string;
    h_pass: string;
    auth: number;
  };

  // data==========
  const UserData: User[] = [
    {
      name: "管理者",
      h_pass: "6c995df83843f2c5cdc17b404d44fa8dc27fc34f97fa625ee8c6de7f171578037c0e79dc929b19dc612c91b1002d2a9da77fcb962f464fcff80c78490b6beb0e",
      auth: 1
    }
    // {
    //   name: "閲覧さん",
    //   h_pass: "aaa",
    //   auth: 0
    // },
    // {
    //   name: "伝票さん",
    //   h_pass: "aaa",
    //   auth: 1
    // },
    // {
    //   name: "管理さん",
    //   h_pass: "aaa",
    //   auth: 2
    // }
  ]

  const callback = (name: string, pass: string) => {
    alert(name);
    alert(pass);
    return 1;
  };

  const loginCheck = (id: string, pass: string) => {
    let authNum=-1; // ログイン情報と合致しなかった事を-1で表現
    const hashPass = sha512(pass);
    // console.log(hashPass);
    // alert(hashPass);
    if(UserData[id]){
      if(UserData[id].h_pass === hashPass){
        authNum = UserData[id].auth_num;
      }
    }
    return authNum;
  }
  return { callback, loginCheck };
}