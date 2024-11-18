import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { POST__signOut } from "@/lib/actions";

const UserAvatar = ({ user }) => {
  const initials = user?.user_metadata?.first_name[0];
  const handle = `@${user?.user_metadata?.username_handle}`;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="c__user-avatar">
            <div className="c__user-avatar__wrapper">
              <div className="c__user-avatar__text uppercase">{initials}</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 c__lib__dropdown-menu">
          <DropdownMenuGroup>
            <a href="/account/edit" className="u__inherited-anchor">
              <DropdownMenuItem className="cursor-pointer">
                My Account
              </DropdownMenuItem>
            </a>
            <a href={`/${handle}`} className="u__inherited-anchor">
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </a>
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
