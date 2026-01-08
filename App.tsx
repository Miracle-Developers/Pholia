import * as auth from '@/lib/auth';
import { ExpoRoot } from "expo-router";
import { ctx } from "expo-router/_ctx";
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    auth.restoreToken().then(() => {
      /* restored */
    });
  }, []);

  return <ExpoRoot context={ctx} />;
}
