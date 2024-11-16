import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { POST__signOut } from "@/lib/actions";

const UserAvatar = ({ user }) => {
  return (
    <>
      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="c__user-avatar">
            <div className="c__user-avatar__wrapper">
              <div className="c__user-avatar__text">M</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="c__user-avatar">
            <div className="c__user-avatar__wrapper">
              <div className="c__user-avatar__text">M</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 c__lib__dropdown-menu">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => POST__signOut()}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatar;
