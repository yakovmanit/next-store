'use client';

import React from 'react';
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {Button} from "@/shared/components/ui";
import {signIn} from "next-auth/react";
import {LoginForm} from "@/shared/components/shared/modals/auth-modal/forms/login-form";
import {RegisterForm} from "@/shared/components/shared/modals/auth-modal/forms/register-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType((prev) => (prev === 'login' ? 'register' : 'login'));
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <div className="max-w-200 mx-auto">
          {
            type === 'login'
              ? <LoginForm onClose={handleClose} />
              : <RegisterForm onClose={handleClose} />
          }

          <hr/>

          <div className="flerx gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                signIn('github', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1">
              <img
                className="w-6 h-6"
                src="https://github.githubassets.com/favicons/favicon.svg"
              />
              GitHub
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1">
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              />
              Google
            </Button>
          </div>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Log In' : 'Sign Up'} with E-Mail
        </Button>
      </DialogContent>
    </Dialog>
  );
};
