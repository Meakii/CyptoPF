import React from 'react';
import { BottomNav } from './mobile/BottomNav';
import { MenuDrawer } from './mobile/MenuDrawer';

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <BottomNav onOpenMenu={() => setOpen(true)} />
      <MenuDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}