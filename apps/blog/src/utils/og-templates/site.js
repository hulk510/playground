import satori from 'satori'
import { SITE } from '@/config'
import loadGoogleFonts from '../loadGoogleFont'

export default async () => {
  return satori(
    {
      type: 'div',
      props: {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Noto Sans JP, IBM Plex Mono',
          position: 'relative',
        },
        children: [
          // 装飾用の円形背景
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-150px',
                right: '-150px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '-200px',
                left: '-200px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
              },
            },
          },
          // メインカード
          {
            type: 'div',
            props: {
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '32px',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '80px',
                margin: '60px',
                width: '85%',
                height: '80%',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                textAlign: 'center',
              },
              children: [
                // タイトル部分
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: '84px',
                      fontWeight: '900',
                      margin: '0 0 30px 0',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-2px',
                      fontFamily: 'Noto Sans JP',
                    },
                    children: SITE.title,
                  },
                },
                // 説明文部分
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '36px',
                      color: '#666666',
                      margin: '0 0 50px 0',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      fontFamily: 'Noto Sans JP',
                    },
                    children: SITE.desc,
                  },
                },
                // ウェブサイト部分
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px 40px',
                      background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                      borderRadius: '25px',
                      color: 'white',
                      fontSize: '32px',
                      fontWeight: '600',
                      fontFamily: 'Noto Sans JP',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          children: new URL(SITE.website).hostname,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(`${SITE.title}${SITE.desc}${SITE.website}`),
    },
  )
}
