'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TypeScriptDemo from "@/components/TypeScriptDemo";

export default function TypeScriptDemoPage() {
  return (
    <>
      <Header activePage="typescript-demo" />
      
      <section className="page-header">
        <div className="container">
          <h1>TypeScript Demo</h1>
          <p>Học TypeScript đơn giản với các ví dụ thực tế</p>
        </div>
      </section>

      <section className="typescript-content">
        <div className="container">
          <TypeScriptDemo />
        </div>
      </section>

      <Footer />
    </>
  );
}

