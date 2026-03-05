import React, { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { Activity, Moon, Droplets, Weight as WeightIcon, Save, StickyNote } from 'lucide-react';
import { useAddVitalsMutation } from '../services/vitals.js';
import cn from '../utils/cn.js';
import { useNavigate } from 'react-router-dom';
import anylaticsApi from '../services/anylatics.js';
import { useDispatch } from 'react-redux';

const FormField = ({ label, unit, error, children }) => (
  <div className="space-y-1.5 flex flex-col w-full">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-bold uppercase tracking-widest text-(--text-secondary)">
        {label} {unit && <span className="text-(--btn-primary) lowercase">({unit})</span>}
      </label>
      {error && <span className="text-[10px] font-bold text-red-500 animate-pulse">{error}</span>}
    </div>
    {children}
  </div>
);

const VitalsInput = () => {
  const [fetchAddVitals, { isLoading }] = useAddVitalsMutation();
  const [errors, setErrors] = useState({});
  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    sleepingDuration: '',
    sugar: '',
    weight: '',
    note: '' 
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    const { systolic, diastolic, sleepingDuration, sugar, weight, note } = vitals;

    // Check if at least one vital or a note is provided
    const hasValues = Object.values({ systolic, diastolic, sleepingDuration, sugar, weight, note })
      .some(val => val !== '' && val !== null);

    if (!hasValues) {
      tempErrors.form = "At least one field (vital or note) is required!";
    }

    console.log(vitals)
    if (systolic && (Number(systolic) < 70 || Number(systolic) > 200)) tempErrors.systolic = "Range: 70-200";
    if (diastolic && (Number(diastolic) < 40 || Number(diastolic) > 130)) tempErrors.diastolic = "Range: 40-130";
    if (sleepingDuration && (Number(sleepingDuration) < 0 || Number(sleepingDuration) > 24)) tempErrors.sleepingDuration = "Max 24 hrs";
    if (sugar && (Number(sugar) < 50 || Number(sugar) > 500)) tempErrors.sugar = "Invalid level";
    if (weight && (Number(weight) < 20 || Number(weight) > 300)) tempErrors.weight = "Invalid weight";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setVitals(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user types
    if (errors[field] || errors.form) {
      setErrors(prev => ({ ...prev, [field]: null, form: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { systolic, diastolic, sleepingDuration, sugar, weight, note } = vitals;
      const res = await fetchAddVitals({
        sleepingDuration,
        sugar,
        weight,
        note,
        bloodPressure:{
          systolic,
          diastolic
        }
      }).unwrap();
      console.log(res)
      if (res.success) {
        alert("Vitals logged successfully!");
        setVitals({ systolic: '', diastolic: '', sleepingDuration: '', sugar: '', weight: '', note: '' });
        navigate('/health-timeline');
        dispatch(anylaticsApi.util.invalidateTags(['Anylatics']))
      } else {
        throw new Error(res.message)
      }
    } catch (error) {
      alert(error?.data?.message || error?.message || 'Some error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-(--bg-primary) p-8 rounded-[2.5rem] border border-(--border-subtle) shadow-xl shadow-blue-500/5 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <FormField label="BP Systolic" unit="mmHg" error={errors.systolic}>
          <Input type="number" placeholder="120" value={vitals.systolic} onChange={handleChange('systolic')} />
        </FormField>

        <FormField label="BP Diastolic" unit="mmHg" error={errors.diastolic}>
          <Input type="number" placeholder="80" value={vitals.diastolic} onChange={handleChange('diastolic')} />
        </FormField>

        <FormField label="Sleep Duration" unit="hr" error={errors.sleepingDuration}>
          <Input type="number" step="0.5" placeholder="7.5" value={vitals.sleepingDuration} onChange={handleChange('sleepingDuration')} />
        </FormField>

        <FormField label="Blood Sugar" unit="mg/dL" error={errors.sugar}>
          <Input type="number" placeholder="95" value={vitals.sugar} onChange={handleChange('sugar')} />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Current Weight" unit="kg" error={errors.weight}>
            <Input type="number" step="0.1" placeholder="70.5" value={vitals.weight} onChange={handleChange('weight')} />
          </FormField>
        </div>

        {/* Note Field */}
        <div className="md:col-span-2">
          <FormField label="Medical Notes" unit="" error={errors.note}>
            <div className="relative">
              <textarea
                value={vitals.note}
                onChange={handleChange('note')}
                placeholder="How are you feeling today? Any symptoms..."
                className="w-full p-4 rounded-xl bg-(--bg-secondary) text-(--text-primary) border border-transparent focus:bg-white focus:border-(--btn-primary) focus:ring-4 focus:ring-blue-500/10 outline-none transition-all min-h-[100px] text-sm resize-none"
              />
              <StickyNote size={16} className="absolute right-4 bottom-4 text-slate-300" />
            </div>
          </FormField>
        </div>
      </div>

      {errors.form && (
        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
          <p className="text-xs font-bold text-red-500 text-center">{errors.form}</p>
        </div>
      )}

      <Button
        type="submit"
        loading={isLoading}
        className="w-full py-4 bg-(--btn-primary) text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
      >
        {!isLoading && <Save size={18} className="mr-2" />}
        {isLoading ? 'Saving Records...' : 'Log Daily Vitals'}
      </Button>
    </form>
  );
};

export default VitalsInput;