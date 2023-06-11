/* eslint-disable react/no-children-prop */
'use client'
import {
  Card,
  CardHeader,
  AbsoluteCenter,
  InputGroup,
  Input,
  InputRightElement,
  CardBody,
  FormControl,
  Button,
  FormErrorMessage,
  useBoolean,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { SettingsIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { State } from '../model'
import { useAccount } from 'wagmi'

const coin = ['ETH', 'Dai', 'Dog', 'Gay', 'Cat', 'XAE']
const Exchange: React.FC<Partial<State>> = ({ tokenList }) => {
  const [title, setTitle] = useState('from')
  const [isSetting, setIsSetting] = useBoolean(false)
  const [tolerance, setTolerance] = useState({ value: 0.01, enabled: false })
  const [waitingTime, setWaitingTime] = useState({ value: 30, enabled: false })
  const [hasDeadline, setHasDeadline] = useBoolean(false)
  const [selectFrom, setSelectFrom] = useState('ETH')
  const [selectTo, setSelectTo] = useState('ETH')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isConnected } = useAccount()
  function validate(value: any) {
    let error
    if (!value) {
      error = 'it is required'
    }
    if (!/\b([1-9]|[1-9][0-9]|100)\b/.test(value)) {
      error = 'please enter a number between 1 and 100'
    }
    return error
  }
  const renderModal = () => {
    return (
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-rose-500'>
          <ModalHeader>{`Change the ${title} coin`}</ModalHeader>
          <ModalCloseButton className='border-null' />
          <ModalBody className='flex flex-row items-center gap-2  pb-8 flex-wrap'>
            {coin.map(i => (
              <div
                key={i}
                className='rounded-md bg-rose-500 text-neutral-100  flex flex-row items-center justify-between   h-8 px-1 text-xl cursor-pointer hover:bg-rose-900  w-1/6 flex-shrink-0'
                onClick={() => {
                  title === 'from' ? setSelectFrom(i) : setSelectTo(i)
                  onClose()
                }}
              >
                <FaEthereum />
                <span>{i}</span>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  const renderForm = () => (
    <Formik
      initialValues={{ note: '', address: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log(values)
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {props => (
        <Form>
          <div className='my-8'>
            <Field name='from' validate={validate}>
              {({ field, form }: any) => {
                return (
                  <FormControl isInvalid={form.errors.from && form.touched.from}>
                    <InputGroup>
                      <Input
                        {...field}
                        autoComplete='off'
                        color='tomato'
                        placeholder='from'
                        _placeholder={{ opacity: 0.4, color: 'inherit' }}
                      />
                      <InputRightElement
                        className='rounded-md bg-rose-500 text-neutral-100 flex flex-row items-center justify-between w-16 px-1 text-lg cursor-pointer hover:bg-rose-900'
                        onClick={() => {
                          setTitle('from')
                          onOpen()
                        }}
                      >
                        <FaEthereum />
                        <span>{selectFrom}</span>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.from}</FormErrorMessage>
                  </FormControl>
                )
              }}
            </Field>
          </div>
          <div className='my-8'>
            <Field name='to' validate={validate}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.to && form.touched.to}>
                  <InputGroup>
                    <Input
                      {...field}
                      autoComplete='off'
                      color='tomato'
                      placeholder='to'
                      _placeholder={{ opacity: 0.4, color: 'inherit' }}
                    />
                    <InputRightElement
                      className='rounded-md bg-rose-500 text-neutral-100 flex flex-row items-center justify-between w-16 px-1 text-lg cursor-pointer hover:bg-rose-900'
                      onClick={() => {
                        setTitle('to')
                        onOpen()
                      }}
                    >
                      <FaEthereum />
                      <span>{selectTo}</span>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.to}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </div>
          <div className='my-8'>
            <Button
              isDisabled={!isConnected}
              mt={4}
              colorScheme='pink'
              variant='outline'
              type='submit'
              isLoading={props.isSubmitting}
              className={`w-full ${isConnected && 'hover:bg-slate-400 hover:text-teal-50'}`}
            >
              {isConnected ? 'Submit' : 'Not Connected'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
  const renderSetting = () => (
    <>
      <div className='flex flex-row items-center my-4'>
        <span className='mr-4'>Slippage tolerance</span>
        {tolerance.enabled ? (
          <UnlockIcon
            className='hover:text-rose-500 cursor-pointer'
            onClick={() => setTolerance({ ...tolerance, enabled: !tolerance.enabled })}
          />
        ) : (
          <LockIcon
            className='hover:text-rose-500 cursor-pointer'
            onClick={() => setTolerance({ ...tolerance, enabled: !tolerance.enabled })}
          />
        )}
      </div>
      <div className='flex flex-row items-center justify-between my-4'>
        <Button
          size={'md'}
          colorScheme='pink'
          variant='outline'
          className={`mr-4 ${tolerance.enabled && 'hover:bg-slate-400 hover:text-teal-50'}`}
          isDisabled={!tolerance.enabled}
        >
          Auto
        </Button>
        <NumberInput
          className='flex-1'
          isDisabled={!tolerance.enabled}
          step={0.01}
          min={0.01}
          max={1.0}
          value={tolerance.value}
          onChange={val => {
            setTolerance({ ...tolerance, value: Number(val) })
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper bg='green.200' _active={{ bg: 'pink.300' }} children='+' />
            <NumberDecrementStepper bg='green.200' _active={{ bg: 'pink.300' }} children='-' />
          </NumberInputStepper>
        </NumberInput>
      </div>
      <div className='flex flex-row items-center my-4'>
        <span className='mr-4'>Waiting time</span>
        {waitingTime.enabled ? (
          <UnlockIcon
            className='hover:text-rose-500 cursor-pointer'
            onClick={() => setWaitingTime({ ...waitingTime, enabled: !waitingTime.enabled })}
          />
        ) : (
          <LockIcon
            className='hover:text-rose-500 cursor-pointer'
            onClick={() => setWaitingTime({ ...waitingTime, enabled: !waitingTime.enabled })}
          />
        )}
      </div>
      <div className='flex flex-row items-center  justify-between my-4'>
        <Input
          isDisabled={!waitingTime.enabled}
          value={waitingTime.value}
          onChange={val => {
            setWaitingTime({ ...waitingTime, value: Number(val) })
          }}
        />
        <Button
          size={'md'}
          colorScheme='pink'
          variant='outline'
          className={`ml-4 ${waitingTime.enabled && 'hover:bg-slate-400 hover:text-teal-50'}`}
          isDisabled={!waitingTime.enabled}
        >
          Minutes
        </Button>
      </div>
      <div className='flex flex-row items-center my-4 justify-between'>
        <span>Transaction deadline</span>
        <Switch size='lg' isChecked={hasDeadline} onChange={setHasDeadline.toggle} colorScheme='pink' />
      </div>
    </>
  )
  return (
    <>
      <AbsoluteCenter h='40px' color='white' axis='both' className='w-5/12 mt-48'>
        <Card width={'100%'} bg={'#20252f'} color={'white'}>
          <CardHeader>
            <div className='flex flex-rows items-center justify-between'>
              <div className='font-bold'>{isSetting ? 'Setting' : 'Swap'}</div>
              <SettingsIcon className=' cursor-pointer hover:text-rose-400' onClick={setIsSetting.toggle} />
            </div>
          </CardHeader>
          <CardBody>{isSetting ? renderSetting() : renderForm()}</CardBody>
        </Card>
        {renderModal()}
      </AbsoluteCenter>
    </>
  )
}

export default Exchange
