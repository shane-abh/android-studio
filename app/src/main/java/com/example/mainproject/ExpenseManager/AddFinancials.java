package com.example.mainproject.ExpenseManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;

import com.example.mainproject.R;
import com.google.android.material.tabs.TabLayout;

public class AddFinancials extends AppCompatActivity {

    private TabLayout tabLayout;
    private ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_financials);
        tabLayout = findViewById(R.id.tablayout);
        viewPager = findViewById(R.id.viewPager);



        tabLayout.setupWithViewPager(viewPager);

        VPAdapter vpAdapter = new VPAdapter(getSupportFragmentManager(), FragmentPagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);

        AddExpenseFragment addExpenseFragment = new AddExpenseFragment();
        vpAdapter.addFragment( addExpenseFragment,"Expense");

        AddIncomeFragment AddIncomeFragment = new AddIncomeFragment();
        vpAdapter.addFragment(AddIncomeFragment, "Income");

        viewPager.setAdapter(vpAdapter);

    }
}