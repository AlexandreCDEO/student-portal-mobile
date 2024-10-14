import React from 'react'
import { View, Text } from 'react-native'

// Função para combinar classes, você pode usar algo semelhante ao 'cn' que mencionou
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ')

// Card Component
function Card({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn('p-10 rounded-xl border border-gray-300', className)}
      {...props}
    />
  )
}

// CardHeader Component
function CardHeader({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4', className)} {...props} />
}

// CardTitle Component
function CardTitle({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn(
        'text-2xl font-semibold tracking-tight text-primary',
        className,
      )}
      {...props}
    />
  )
}

// CardDescription Component
function CardDescription({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return <Text className={cn('text-sm text-gray-500', className)} {...props} />
}

// CardContent Component
function CardContent({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4 pt-0', className)} {...props} />
}

// CardFooter Component
function CardFooter({
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn('flex flex-row items-center p-4 pt-0', className)}
      {...props}
    />
  )
}

// SimpleCard Component
interface SimpleCardProps {
  className?: string
  title?: string
  description?: string
  content?: string
  footer?: string
}
function SimpleCard({
  className,
  title,
  description,
  content,
  footer,
}: SimpleCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {content && (
        <CardContent>
          <Text className="text-base text-primary">{content}</Text>
        </CardContent>
      )}
      {footer && (
        <CardFooter>
          <Text className="text-sm text-gray-500">{footer}</Text>
        </CardFooter>
      )}
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SimpleCard,
}
