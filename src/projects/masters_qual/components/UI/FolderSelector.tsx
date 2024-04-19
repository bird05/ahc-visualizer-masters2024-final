import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setUrls } from '../../store/outputSlice';
// CSS
import styled from "@emotion/styled";
// MUI

// 型
// import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const FolderSelector = () => {
  // useState==============================
  
  // Redux==============================
  const seed = useSelector((state) => state.input.seed);
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const SLabel = styled.label`
  color:red;
  `
  // 関数==============================
  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if(e.target.files){
      const buf=new Array();
      for(let i=0; i<e.target.files.length; ++i){
        buf[i]={
          id: Number(e.target.files[i].name.substring(0,4)),
          blob: URL.createObjectURL(e.target.files[i])
        };
      }
      console.log(buf);
      buf.sort((a, b) => a.id-b.id);
      console.log(buf);
      const blobs=new Array();
      for(let i=0; i<e.target.files.length; ++i){
        blobs[i]=buf[i].blob;
      }
      dispatch(setUrls(blobs));
      console.log(blobs);
    }
    // console.log(e.target.files);
    // console.log(e.target.files[0]);
    // const url=URL.createObjectURL(e.target.files[0]);
    // // const url=e.target.files[0].webkitRelativePath;
  };
  // DOM==============================
  console.log("FolderSelector");
  return(
    <>
      <label>Output Folder: </label>
      <br></br>
      {/* <select id="fileSelect" disabled></select> */}
      <input 
        type="file" 
        id="dirSelect"
        name="upfile[]"
        /* @ts-expect-error */
        directory="" 
        webkitdirectory="" 
        onChange={onFileInputChange}
      />
      {/* <input id="file" type="file" name="upfile[]" webkitdirectory></input> */}
      {/* <input type="file"/> */}
      {/* <input type="file" defaultValue={0} value={seed} min={0} max={99} onChange={(e) => dispatch(setSeed(e.target.value))}/> */}
    </>
  )
};