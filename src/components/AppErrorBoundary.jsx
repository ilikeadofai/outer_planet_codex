import { Component } from 'react';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('앱 렌더링 오류:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
          <div className="w-full max-w-xl rounded-xl border border-rose-700 bg-slate-900 p-5">
            <h1 className="text-xl font-bold text-rose-300">일시적인 화면 오류가 발생했습니다.</h1>
            <p className="mt-2 text-sm text-slate-300">발표를 계속하려면 아래 버튼으로 기본 상태로 다시 시작해 주세요.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              앱 다시 시작
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
