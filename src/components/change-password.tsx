import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

type FormData = {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
};

export default function ChangePassword() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const novaSenha = watch('novaSenha'); // Para validar a confirmação de senha

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // CHAMA API para alterar a senha
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View className='gap-4 w-full'>
          <View className='gap-4'>
            <View className='gap-0.5'>
              {/* Senha Atual */}
              <Controller
                control={control}
                name='senhaAtual'
                rules={{ required: 'Senha atual é obrigatória' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input isPassword label='Senha Atual' variant='primary'>
                    <Input.Field
                      placeholder='Digite sua senha atual'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                    />
                  </Input>
                )}
              />
              {errors.senhaAtual && (
                <Text className='text-red-500'>{errors.senhaAtual.message}</Text>
              )}
            </View>

            <View className='gap-0.5'>
              {/* Nova Senha */}
              <Controller
                control={control}
                name='novaSenha'
                rules={{ required: 'Nova senha é obrigatória' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input isPassword label='Nova Senha' variant='primary'>
                    <Input.Field
                      placeholder='Digite sua nova senha'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                    />
                  </Input>
                )}
              />
              {errors.novaSenha && (
                <Text className='text-red-500'>{errors.novaSenha.message}</Text>
              )}
            </View>

            <View  className='gap-0.5'>
              {/* Confirmar Nova Senha */}
              <Controller
                control={control}
                name='confirmarNovaSenha'
                rules={{
                  required: 'Confirmação de senha é obrigatória',
                  validate: (value) =>
                    value === novaSenha || 'As senhas não correspondem',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input isPassword label='Confirmar Nova Senha' variant='primary'>
                    <Input.Field
                      placeholder='Confirme a nova senha'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                    />
                  </Input>
                )}
              />
              {errors.confirmarNovaSenha && (
                <Text className='text-red-500'>{errors.confirmarNovaSenha.message}</Text>
              )}
            </View>
          </View>
          <Button variant='primary' onPress={handleSubmit(onSubmit)}>
            <Button.Title>ALTERAR SENHA</Button.Title>
          </Button>
        </View>
    </ScrollView>
    
  );
}
