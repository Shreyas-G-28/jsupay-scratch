import React from "react";
import MotionBlock from "../features/motion/MotionBlock";
import LooksBlock from "../features/looks/LooksBlock";
import EventBlock from "../features/events/EventBlock";
import ControlBlock from "../features/control/ControlBlock";

const Sidebar = () => {
  return (
    <div className="h-[600px] overflow-y-auto p-4 border-r border-gray-300">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Motion</h3>
          <MotionBlock type="moveForward" label="Move Forward" />
          <MotionBlock type="rotateClockwise" label="Rotate Clockwise" />
          <MotionBlock
            type="rotateAntiClockwise"
            label="Rotate Anticlockwise"
          />
          <MotionBlock
            type="goToRandomPosition"
            label="Go to Random Position"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold">Looks</h3>
          <LooksBlock type="sayHello" label="Say Hello" />
          <LooksBlock type="sayHelloFor4Sec" label="Say Hello for 4 Seconds" />
          <LooksBlock type="thinkHmm" label="Think Hmm..." />
          <LooksBlock type="thinkHmmFor4Sec" label="Think Hmm for 4 Seconds" />
        </div>

        <div>
          <h3 className="text-xl font-bold">Events</h3>
          <EventBlock type="flagClicked" label="Flag Clicked" />
          <EventBlock type="spacebarPressed" label="Spacebar Pressed" />
          <EventBlock type="spriteClicked" label="Sprite Clicked" />
          <EventBlock type="removeAllFunctions" label="Remove All Functions" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
