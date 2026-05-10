import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/theme';
import { checkLoggedIn, requireLogin, type LoginReturnTarget } from '../../lib/authGuard';

type RequireAuthProps = {
  children: React.ReactNode;
  returnTo: LoginReturnTarget;
  fromSource?: string;
};

function RequireAuth({ children, returnTo, fromSource }: RequireAuthProps): React.JSX.Element {
  const navigation = useNavigation();
  const [allowed, setAllowed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const loggedIn = await checkLoggedIn();
        if (!active) {
          return;
        }
        setAllowed(loggedIn);
        if (!loggedIn) {
          await requireLogin(navigation, returnTo, { fromSource, showAlert: false });
        }
      })();
      return () => {
        active = false;
      };
    }, [fromSource, navigation, returnTo]),
  );

  if (!allowed) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.orange600} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default RequireAuth;
