import React, { useState } from "react";
import { SingleAction } from "./singleAction";
import {  Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Sprites } from "./spriteProps";
import Positions from "./positons";
import Draggable1 from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WARN_MSG_POS } from "../constants";

export const Body = (props) => {
  const { moves, setMoves, actions, setActions, setActions2, actions2 } = props;

  const ref = React.useRef();
  const ref2 = React.useRef();

  let r = "0%";
  let t = "0%";
  let scale = 1;
  let angle = 0;
  let r2 = "0%";
  let t2 = "0%";
  let scale2 = 1;
  let angle2 = 0;

  const [hello, setHello] = React.useState(false);
  const [hello2] = React.useState(false);
  const [displayAddIcon, setDisplayAddIcon] = React.useState(true);
  const [sprite, setSprite] = React.useState(
    require("../Assets/images/cat.png")
  );
  const [sprite2, setSprite2] = React.useState(null);

  console.log("rendering...");

  function transform(temp, xAxis, action1) {
    let value = temp.toString();
    if (xAxis) {
      if (action1) {
        r = value.concat("%");
      } else {
        r2 = value.concat("%");
      }
    } else {
      if (action1) {
        t = value.concat("%");
      } else {
        t2 = value.concat("%");
      }
    }
    action1
      ? (ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`)
      : (ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`);
  }

  function moveUp(i, action1) {
    setTimeout(() => {
      let temp = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
      temp = temp - 50;
      if (temp < -140) {
        refresh(WARN_MSG_POS);
        return;
      }
      transform(temp, false, action1);
    }, i * 1500);
  }

  function moveDown(i, action1) {
    setTimeout(() => {
      let temp = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
      temp = temp + 50;
      if (temp > 140) {
        refresh(WARN_MSG_POS);
        return;
      }
      transform(temp, false, action1);
    }, i * 1500);
  }

  function moveRight(i, action1) {
    setTimeout(() => {
      let temp = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
      temp = temp + 50;
      if (temp > 290) {
        refresh(WARN_MSG_POS);
        return;
      }
      transform(temp, true, action1);
    }, i * 1500);
  }

  function moveLeft(i, action1) {
    setTimeout(() => {
      let temp = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
      temp = temp - 50;
      if (temp < -290) {
        refresh(WARN_MSG_POS);
        return;
      }
      transform(temp, true, action1);
    }, i * 1500);
  }



  function moveXY(xInput, yInput, random, i, action1) {
    setTimeout(() => {
      let tempR = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
      let tempT = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
      tempR =
        tempR !== parseInt(xInput) && parseInt(xInput) !== 0
          ? random
            ? Math.floor(Math.random() * (-290 - 290) + 290)
            : parseInt(xInput)
          : tempR;
      tempT =
        tempT !== -parseInt(yInput) && parseInt(yInput) !== 0
          ? random
            ? Math.floor(Math.random() * (-140 - 140) + 140)
            : -parseInt(yInput)
          : tempT;
      if (parseInt(yInput) == 0) {
        tempT = 0;
      }
      if (parseInt(xInput) == 0) {
        tempR = 0;
      }
      if (tempR < -290 || tempR > 290 || tempT < -140 || tempT > 140) {
        refresh(WARN_MSG_POS);
        return;
      }
      let valueR = tempR.toString();
      let valueT = tempT.toString();

      if (action1) {
        r = valueR.concat("%");
        t = valueT.concat("%");
      } else {
        r2 = valueR.concat("%");
        t2 = valueT.concat("%");
      }
      action1
        ? (ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`)
        : (ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`);
    }, i * 1500);
  }

  const rotate = (rAngle, i, action1) => {
    setTimeout(() => {
      action1 ? (angle += rAngle) : (angle2 += rAngle);
      action1
        ? (ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`)
        : (ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`);
    }, i * 1500);
  };

  const startActions = (action, idx, action1) => {
    switch (action) {
      case "Take 10 Steps ---->": {
        moveRight(idx, action1);
        break;
      }
      case "Take 10 Steps <----": {
        moveLeft(idx, action1);
        break;
      }
      case "Take 10 Steps Up": {
        moveUp(idx, action1);
        break;
      }
      case "Take 10 Steps Down": {
        moveDown(idx, action1);
        break;
      }
      case "Rotate At 45°": {
        rotate(45, idx, action1);
        break;
      }
      case "Rotate At 90°": {
        rotate(90, idx, action1);
        break;
      }
      case "Rotate At 135°": {
        rotate(135, idx, action1);
        break;
      }
      case "Rotate At 180°": {
        rotate(180, idx, action1);
        break;
      }
      case "Rotate At 360°": {
        rotate(360, idx, action1);
        break;
      }
      default:
        break;
    }
  };

  function clearTimeouts() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
  }

  const refresh = (msg) => {
    r = "0%";
    t = "0%";
    r2 = "0%";
    t2 = "0%";
    scale2 = 1;
    angle2 = 0;
    scale = 1;
    angle = 0;
    clearTimeouts();
    setHello(false);

    if (msg) {
      toast.warn(msg, {
        position: "top-center",
        autoClose: 2000,
        borderRadius: "20px",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle})`;
    ref2.current.style.transform = `scale(${scale2}) translate(${r2}, ${t2}) rotate(${angle2})`;
  };

  function runAction1() {
    actions &&
      actions.map((item, i) => {
        startActions(item.todo, i, true);
        return;
      });
  }

  function runAction2() {
    !displayAddIcon &&
      actions2 &&
      actions2.map((item, i) => {
        startActions(item.todo, i, false);
        return;
      });
  }

  const [isHeroControlOpen, setIsHeroControlOpen] = useState(true);

  const toggleHeroControl = () => {
    setIsHeroControlOpen(!isHeroControlOpen);
  };

  return (
    <div className="mainContainer">
      <ToastContainer />
      <div className="container">
        <Droppable droppableId="MovesList">
          {(provided) => (
            <div
              className="moves"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                className="moves__heading"
                style={{ backgroundColor: "red", cursor: "pointer" }}
                onClick={toggleHeroControl}
              >
                Controls
              </div>
              {isHeroControlOpen && (
                <>
                  {moves?.slice(0, 4).map((move, index) => (
                    <SingleAction
                      disableDelete={true}
                      index={index}
                      moves={moves}
                      move={move}
                      key={move.id}
                      setMoves={setMoves}
                    />
                  ))}
                  <div
                    className="moves__heading"
                    style={{ marginTop: "20px", backgroundColor: "orange" }}
                  >
                    Cordinates Moves
                  </div>

                  {moves
                    ?.filter((move) => [6, 9, 10, 11, 12].includes(move.id))
                    .map((move, index) => (
                      <SingleAction
                        disableDelete={true}
                        index={index + 4}
                        moves={moves}
                        move={move}
                        key={move.id}
                        setMoves={setMoves}
                      />
                    ))}
                </>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="MovesActions">
          {(provided) => (
            <div
              className="moves actions"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span
                className="moves__heading"
                style={{ backgroundColor: "green" }}
              >
                Pay Bar 1
              </span>
              {actions?.map((move, index) => (
                <SingleAction
                  index={index}
                  moves={actions}
                  move={move}
                  key={move.id}
                  refresh={refresh}
                  setMoves={setActions}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {displayAddIcon && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="icon">
              <AddBoxIcon
                sx={{
                  color: "green",
                  cursor: "pointer",
                  marginTop: "10px",
                  height: "40px",
                  width: "40px",
                }}
                onClick={() => {
                  setDisplayAddIcon(!displayAddIcon);
                  setSprite2(require("../Assets/images/jerry1.png"));
                  // refresh();
                }}
              />
              <span class="tooltiptext">add sprite</span>
            </div>
            {/* <div>
              <DeleteIcon
                onClick={() => {
                  setActions([]);
                }}
                sx={{ cursor: "pointer", fontSize: "30px", color: "Grey" }}
              />
            </div> */}
          </div>
        )}
        {!displayAddIcon && (
          <Droppable droppableId="MovesActions2">
            {(provided) => (
              <div
                className="moves actions"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <span
                  className="moves__heading"
                  style={{ backgroundColor: "green" }}
                >
                  Play Bar 2
                </span>
                {actions2?.map((move, index) => (
                  <SingleAction
                    index={index}
                    moves={actions2}
                    move={move}
                    key={move.id}
                    refresh={refresh}
                    setMoves={setActions2}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
        {!displayAddIcon && (
          <div className="icon">
            <DisabledByDefaultIcon
              sx={{
                color: "red",
                cursor: "pointer",
                marginTop: "10px",
                height: "40px",
                width: "40px",
              }}
              onClick={() => {
                setDisplayAddIcon(!displayAddIcon);
                setSprite2(null);
                refresh();
              }}
            />
          </div>
        )}

        <div className="moves play">
          <Draggable1
            bounds={{ left: -540, top: -250, right: 540, bottom: 250 }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                ref={ref}
                style={{
                  position: "relative",
                  transition: "1s all ease",
                }}
              >
                {hello ? (
                  <div
                    style={{ transition: "0s all ease" }}
                    className="msgPopup"
                  >
                    hello!
                  </div>
                ) : null}
                <img
                  src={sprite}
                  draggable="false"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    height: 200,
                    width: 200,
                    transition: "1s all ease",
                  }}
                />
              </div>
              {!displayAddIcon && (
                <div
                  ref={ref2}
                  style={{
                    position: "relative",
                    transition: "1s all ease",
                  }}
                >
                  {hello2 ? (
                    <div
                      style={{ transition: "0s all ease" }}
                      className="msgPopup"
                    >
                      hello!
                    </div>
                  ) : null}
                  <img
                    src={sprite2}
                    draggable="false"
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      height: 200,
                      width: 200,
                      transition: "1s all ease",
                    }}
                  />
                </div>
              )}
            </div>
          </Draggable1>
        </div>
      </div>

      <div className="gameProps">
        <Sprites
          setSprite={setSprite}
          setSprite2={setSprite2}
          displayAddIcon={displayAddIcon}
          sprite2={sprite2}
          sprite={sprite}
        />

        <div className="playRefresh">
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              marginRight: "5px",
              // height: "40px",
              // width: "80px",
            }}
            color="success"
            onClick={() => {
              runAction1();
              runAction2();
            }}
          >
            <PlayArrowIcon />
          </Button>
          {/* <Button
            variant="contained"
            sx={{ borderRadius: "20px", height: "40px", width: "80px" }}
            color="error"
            onClick={refresh}
          >
            <RefreshIcon sx={{ color: "white" }} />
          </Button> */}
        </div>
        <Positions handleMove={moveXY} refresh={refresh} />
        {/* <Resize setSize={handleScale} size={"small"} /> */}
      </div>
    </div>
  );
};
export default Body;
