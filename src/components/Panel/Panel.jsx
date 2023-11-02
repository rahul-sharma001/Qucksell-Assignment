import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineStatusOnline } from "react-icons/hi";
import "./Panel.css";
import Card from "../Card/Card";
import { BsReception4 } from "react-icons/bs"; //BsReception4

import {
  FcMediumPriority
} from "react-icons/fc";

const Panel = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );
  var group = localStorage.getItem("group");

  return (
    selectedData && (
      <div className="dashContainer" style={{ display: "flex", flexDirection: 'column', justifyContent: "space-evenly" }}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"baseline", justifyContent:"space-between", backgroundColor:"#f8f8f7cb"}}>
        {selectedData.map((elem, index) => {
          return (
            <>
              <div key={index} className="dashCardContainer">
                <div className="dashCardHeading">
                  <div className="leftView">
                  {group !== "user" ? (
                      group === "status" ? (
                          <HiOutlineStatusOnline />
                      ) : group === "priority" ? (
                          <FcMediumPriority />
                        )
                     : (
                        <BsReception4 />
                      )
                    ) : (
                      <>
                        <div className="image">
                          <img src={elem[index].img} alt="Error" />
                        </div>
                      </>
                    )}
                    <span>
                      {" "}
                      {elem[index]?.title} {elem[index]?.value?.length}
                    </span>
                  </div>

                </div>
                <div className="dashList flex-gap-10">
                  {elem[index]?.value?.map((elem, ind) => {
                    return (
                      <Card id={elem.id} title={elem.title} tag={elem.tag} img ={elem.image} remove={group !=='user'}/>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
        </div>
      </div>
    )
  );
};

export default Panel;
