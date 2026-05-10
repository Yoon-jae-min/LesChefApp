import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import RecipeForm from './RecipeForm';
import { colors } from '../../styles/theme';
import { submitRecipe } from '../../api/recipe/crud';
import type { RecipeSubmitData } from '../../types/apiRecipe';

function RecipeWritePage(): React.JSX.Element {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RecipeSubmitData) => {
    setLoading(true);
    try {
      await submitRecipe({ ...data, isEdit: false });
      Alert.alert('완료', '레시피가 등록되었습니다.', [{ text: '확인', onPress: () => (navigation as any).goBack() }]);
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <RecipeForm
        mode="create"
        submitting={loading}
        onSubmit={onSubmit}
        onCancel={() => (navigation as any).goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
});

export default RecipeWritePage;
