import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'expo-router';

type FormData = {
  matricula: string;
  senha: string;
};

export default function Authenticate() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // CHAMA API
    router.replace('/dashboard' as const)
  };

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode='repeat'
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex-1 justify-center items-center'>
          <Card className='bg-white rounded-lg w-[80%] gap-10'>
            <View className='items-center'>
              <Image
                source={require('../assets/logo.png')}
                className='w-24 h-24'
              />
              <Text className='text-center font-normal text-lg text-gray-900'>
                PORTAL DO ALUNO
              </Text>
            </View>

            <View className='gap-2'>
              {/* Campo Matrícula/CPF */}
              <Controller
                control={control}
                name='matricula'
                rules={{ required: 'Matrícula/CPF é obrigatório' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input label='Matrícula/CPF' variant='primary'>
                    <Input.Field
                      placeholder='Nº da Matrícula ou CPF'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.matricula?.message && typeof errors.matricula.message === 'string' && (
                <Text className='text-red-500'>{errors.matricula.message}</Text>
              )}

              {/* Campo Senha */}
              <Controller
                control={control}
                name='senha'
                rules={{ required: 'Senha é obrigatória' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input isPassword label='Senha' variant='primary'>
                    <Input.Field
                      placeholder='Senha'
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!isPasswordVisible}
                    />
                  </Input>
                )}
              />
              {errors.senha?.message && typeof errors.senha.message === 'string' && (
                <Text className='text-red-500'>{errors.senha.message}</Text>
              )}
            </View>

            <Button variant='primary' onPress={handleSubmit(onSubmit)}>
              <Button.Title>INICIAR SESSÃO</Button.Title>
            </Button>
          </Card>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
