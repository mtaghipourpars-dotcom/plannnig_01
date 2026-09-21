export type Language = 'en' | 'fa';

export const translations = {
  en: {
    appTitle: 'MAPNA PARS Dynamic Production Planning',
    appSubtitle: 'Generator Engineering & Manufacturing — Operational Planning & Scenario Lab',
    tagline: 'Past is Fact; Future is Plan.',
    navControlTower: 'Executive Control Tower',
    navPlanningWorkspace: 'Planning Workspace',
    navScenarioLab: 'Scenario Lab',
    navResourceBoard: 'Resource Board',
    navDecisionWorkbench: 'Decision Workbench',
    navSapMonitor: 'SAP S/4HANA Sync',
    
    // Status badges
    baselineActive: 'Active Baseline Plan',
    planningQuantum: 'Quantum: 1 Day',
    lastClosedDay: 'Last Closed Fact Day',
    currentPlanningDay: 'Current Planning Day',
    closeDayButton: 'Execute Day-Close (Roll Horizon)',
    dayCloseSuccess: 'Day successfully closed. Historical actuals sealed into immutable facts.',
    
    // Control Tower
    commitmentsAtRisk: 'Commitments At Risk',
    resourceCrises: 'Critical Bottlenecks',
    pendingDecisions: 'Decisions Awaiting Approval',
    deliveryReliability: 'On-Time Delivery Reliability',
    sapStatus: 'SAP RFC Status',
    dataFreshness: 'Data Freshness',
    justNow: 'Real-time (Synced)',
    syntheticWarning: 'Synthetic baseline generated from PARS industrial engineering specifications.',
    
    // Planning Workspace
    searchOrders: 'Filter by Order / Product / Customer...',
    filterLine: 'Product Line',
    allLines: 'All Product Lines',
    orderNumber: 'Order Number',
    productModel: 'Product Model',
    customer: 'Client / Plant',
    dueDate: 'Committed Due Date',
    projectedDate: 'Forecast Completion',
    priority: 'Priority',
    status: 'Status',
    pastFactsNote: 'Operations highlighted in slate are closed actuals (immutable facts). Cyan/amber bars represent scheduled future plans.',
    
    // Scenario Lab
    scenarioTitle: 'Scenario & What-If Simulation Lab',
    scenarioSubtitle: 'Fork the baseline plan, inject typed events, and evaluate feasibility & opportunity cost.',
    createScenario: 'Create Scenario Branch',
    injectEvent: 'Inject Typed Event',
    runSimulation: 'Run Recalculation Engine',
    beforeVsAfter: 'Before vs After Impact Propagation',
    feasibilityCheck: 'Feasibility Gate',
    opportunityCost: 'Calculated Opportunity Cost',
    promoteToDecision: 'Promote to Decision Workbench',
    
    // Event Types
    MACHINE_BREAKDOWN: 'Machine Breakdown (Capacity Loss)',
    PRODUCTION_ORDER_PRIORITY_CHANGED: 'Order Priority Reprioritization',
    MATERIAL_RECEIPT_DELAYED: 'Material Supply Delay',
    MATERIAL_RECEIPT_CONFIRMED: 'Early Material Receipt',
    QUALITY_HOLD_CREATED: 'Quality Non-Conformance Hold',
    CASH_INJECTED: 'Financial Capital Injection',
    
    // Feasibility status
    FEASIBLE_NOW: 'Feasible (No Violations)',
    FEASIBLE_CONDITIONAL: 'Conditionally Feasible (Mitigation Required)',
    NOT_FEASIBLE: 'Not Feasible (Constraint Violation)',
    RESOURCE_CRISIS: 'Resource Crisis (Unresolvable Shortage)',
    
    // Resource Board
    workCenters: 'Heavy Work Centers & Machines',
    materials: 'Key Strategic Materials & Stampings',
    manpower: 'Certified Specialized Manpower',
    cashFlow: 'Projected Milestone Cash Flow',
    firstShortage: 'Earliest Shortage Date',
    onHand: 'On-Hand Stock',
    safetyStock: 'Safety Threshold',
    capacityUtilization: 'Capacity Load',
    
    // Decision Workbench
    decisionTitle: 'Executive Decision Governance Workbench',
    decisionSubtitle: 'Review evaluated alternatives, check objective weights, and release approved writes to SAP S/4HANA.',
    approvePlan: 'Approve & Promulgate Plan',
    rejectPlan: 'Reject Alternative',
    writeToSap: 'Stage & Commit to SAP S/4HANA',
    sapOutbox: 'Transactional Outbox & Idempotency Audit',
    approvedBy: 'Decision Authority',
    rationale: 'Engineering Rationale',
    
    // General
    actions: 'Actions',
    viewDetails: 'View Details',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    select: 'Select',
    unit: 'Unit',
    days: 'Days',
    hours: 'Hours',
    tons: 'Tons',
  },
  fa: {
    appTitle: 'سامانه برنامه‌ریزی پویا و تخصیص منابع پارس مپنا',
    appSubtitle: 'مهندسی و ساخت ژنراتور مپنا (پارس) — برنامه‌ریزی عملیاتی و شبیه‌سازی سناریوها',
    tagline: 'گذشته فکت و واقعیت است؛ آینده برنامه است.',
    navControlTower: 'برج کنترل مدیریتی',
    navPlanningWorkspace: 'میز کار برنامه‌ریزی',
    navScenarioLab: 'آزمایشگاه سناریو و شبیه‌سازی',
    navResourceBoard: 'تابلوی منابع و گلوگاه‌ها',
    navDecisionWorkbench: 'میز تصمیم‌گیری و تاییدات',
    navSapMonitor: 'اتصال و همگام‌سازی SAP S/4HANA',
    
    // Status badges
    baselineActive: 'برنامه مبنای فعال',
    planningQuantum: 'کوانتوم زمانی: ۱ روز',
    lastClosedDay: 'آخرین روز بسته شده (فکت قطعی)',
    currentPlanningDay: 'روز جاری برنامه‌ریزی',
    closeDayButton: 'بستن روز و انتقال افق (Day-Close)',
    dayCloseSuccess: 'روز برنامه‌ریزی با موفقیت بسته شد. وقایع گذشته به فکت‌های غیرقابل تغییر تبدیل شدند.',
    
    // Control Tower
    commitmentsAtRisk: 'تعهدات در معرض ریسک',
    resourceCrises: 'بحران‌ها و گلوگاه‌های بحرانی',
    pendingDecisions: 'تصمیمات در انتظار تصویب',
    deliveryReliability: 'قابلیت اطمینان تحویل به موقع',
    sapStatus: 'وضعیت ارتباط SAP RFC',
    dataFreshness: 'تازگی داده‌ها',
    justNow: 'بلادرنگ (همگام)',
    syntheticWarning: 'داده‌های اولیه بر اساس مشخصات فنی کارخانجات پارس مپنا پیکربندی شده است.',
    
    // Planning Workspace
    searchOrders: 'جستجو در سفارشات / توربین‌ها / مشتریان...',
    filterLine: 'خط محصول',
    allLines: 'همه خطوط تولید',
    orderNumber: 'شماره سفارش',
    productModel: 'مدل محصول / توربین',
    customer: 'نیروگاه / مشتری',
    dueDate: 'موعد تحویل قراردادی',
    projectedDate: 'پیش‌بینی اتمام',
    priority: 'اولویت',
    status: 'وضعیت',
    pastFactsNote: 'عملیات با رنگ تیره واقعیت‌های محقق‌شده گذشته هستند. بخش‌های فیروزه‌ای و کهربایی برنامه‌ریزی متغیر آینده می‌باشند.',
    
    // Scenario Lab
    scenarioTitle: 'آزمایشگاه سناریو و شبیه‌سازی وقایع',
    scenarioSubtitle: 'انشعاب از برنامه مبنا، تزریق رویدادها، و ارزیابی قابلیت اجرا و هزینه فرصت.',
    createScenario: 'ایجاد شاخه سناریوی جدید',
    injectEvent: 'تزریق رویداد سیستمی',
    runSimulation: 'اجرای موتور باز‌محاسبه',
    beforeVsAfter: 'مقایسه اثرات (قبل در برابر بعد)',
    feasibilityCheck: 'دروازه امکان‌سنجی سخت',
    opportunityCost: 'هزینه فرصت محاسبه‌شده',
    promoteToDecision: 'ارسال به میز تصمیم‌گیری',
    
    // Event Types
    MACHINE_BREAKDOWN: 'خرابی تجهیز / افت ظرفیت ماشین‌آلات',
    PRODUCTION_ORDER_PRIORITY_CHANGED: 'تغییر اولویت سفارش تولید',
    MATERIAL_RECEIPT_DELAYED: 'تاخیر در دریافت مواد اولیه',
    MATERIAL_RECEIPT_CONFIRMED: 'ورود زودهنگام مواد به انبار',
    QUALITY_HOLD_CREATED: 'توقف کنترل کیفیت (عدم انطباق)',
    CASH_INJECTED: 'تزریق نقدینگی و منابع مالی',
    
    // Feasibility status
    FEASIBLE_NOW: 'قابل اجرا (بدون نقض قیود)',
    FEASIBLE_CONDITIONAL: 'امکان‌پذیر مشروط (نیازمند اقدامات جبرانی)',
    NOT_FEASIBLE: 'غیرقابل اجرا (نقض قیود سخت)',
    RESOURCE_CRISIS: 'بحران منابع (کمبود لاینحل)',
    
    // Resource Board
    workCenters: 'ایستگاه‌های کاری سنگین و ماشین‌آلات',
    materials: 'مواد اولیه استراتژیک و ورق‌های سیلیسی',
    manpower: 'نیروی انسانی دارای گواهینامه معتبر',
    cashFlow: 'جریان نقدینگی پروژه‌ای پیش‌بینی‌شده',
    firstShortage: 'اولین تاریخ پیش‌بینی کسری',
    onHand: 'موجودی انبار پای کار',
    safetyStock: 'حاشیه اطمینان',
    capacityUtilization: 'درصد اشغال ظرفیت',
    
    // Decision Workbench
    decisionTitle: 'میز حاکمیت تصمیمات راهبردی',
    decisionSubtitle: 'بررسی گزینه‌های سناریویی، وزن اهداف، و ارسال مصوبات به سیستم SAP S/4HANA.',
    approvePlan: 'تصویب و ارتقا به برنامه مبنا',
    rejectPlan: 'رد گزینه پیشنهادی',
    writeToSap: 'ارسال و ثبت تراکنش در SAP S/4HANA',
    sapOutbox: 'صف پیام‌های خروجی و ثبت عدم تکرار',
    approvedBy: 'مرجع تصویب‌کننده',
    rationale: 'دلایل فنی و مهندسی',
    
    // General
    actions: 'اقدامات',
    viewDetails: 'مشاهده جزئیات',
    close: 'بستن',
    save: 'ذخیره',
    cancel: 'انصراف',
    select: 'انتخاب',
    unit: 'واحد',
    days: 'روز',
    hours: 'ساعت',
    tons: 'تن',
  }
};
